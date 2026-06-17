package com.hapms.core.service;

import com.hapms.core.model.Appointment;
import com.hapms.core.model.Billing;
import com.hapms.core.repository.AppointmentRepository;
import com.hapms.core.repository.BillingRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BillingService {

    private final BillingRepository billingRepository;
    private final AppointmentRepository appointmentRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public BillingService(BillingRepository billingRepository,
                          AppointmentRepository appointmentRepository,
                          KafkaTemplate<String, String> kafkaTemplate) {
        this.billingRepository = billingRepository;
        this.appointmentRepository = appointmentRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    public List<Billing> getBillsByPatient(UUID patientId) {
        return billingRepository.findByPatientId(patientId);
    }

    public Billing getBillById(UUID id) {
        return billingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    @Transactional
    public Billing generateBill(UUID appointmentId, String lineItems, BigDecimal subtotal, BigDecimal insuranceAdj, BigDecimal discount) {
        // Idempotency check
        if (billingRepository.findByAppointmentId(appointmentId).isPresent()) {
            return billingRepository.findByAppointmentId(appointmentId).get();
        }

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Billing billing = new Billing();
        billing.setAppointment(appointment);
        billing.setPatient(appointment.getPatient());
        billing.setLineItems(lineItems);
        billing.setSubtotal(subtotal);
        billing.setInsuranceAdj(insuranceAdj != null ? insuranceAdj : BigDecimal.ZERO);
        billing.setDiscount(discount != null ? discount : BigDecimal.ZERO);

        // Calculate total: subtotal - insuranceAdj - discount
        BigDecimal total = subtotal.subtract(billing.getInsuranceAdj()).subtract(billing.getDiscount());
        if (total.compareTo(BigDecimal.ZERO) < 0) {
            total = BigDecimal.ZERO;
        }
        billing.setTotalDue(total);
        billing.setStatus("PENDING");

        return billingRepository.save(billing);
    }

    @Transactional
    public Billing recordPayment(UUID billingId, String paymentMethod) {
        Billing billing = getBillById(billingId);
        if ("PAID".equals(billing.getStatus())) {
            return billing;
        }

        billing.setStatus("PAID");
        billing.setPaymentMethod(paymentMethod);
        billing.setPaidAt(LocalDateTime.now());
        Billing saved = billingRepository.save(billing);

        // Update appointment status to CHECKED_OUT
        Appointment appointment = billing.getAppointment();
        appointment.setStatus("CHECKED_OUT");
        appointmentRepository.save(appointment);

        // Publish Event
        publishKafkaEvent("billing.completed", String.format("{\"billingId\":\"%s\",\"patientId\":\"%s\",\"totalAmount\":%s,\"paymentMethod\":\"%s\"}",
                saved.getId(), billing.getPatient().getId(), saved.getTotalDue(), paymentMethod));

        return saved;
    }

    private void publishKafkaEvent(String topic, String payload) {
        try {
            kafkaTemplate.send(topic, payload);
        } catch (Exception e) {
            System.err.println("Failed to publish Kafka event: " + e.getMessage());
        }
    }
}
