package com.hapms.core.service;

import com.hapms.core.model.Appointment;
import com.hapms.core.model.Prescription;
import com.hapms.core.repository.AppointmentRepository;
import com.hapms.core.repository.PrescriptionRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,
                               AppointmentRepository appointmentRepository,
                               KafkaTemplate<String, String> kafkaTemplate) {
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public List<Prescription> getPrescriptionsByPatient(UUID patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    public List<Prescription> getPrescriptionsByDoctor(UUID doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    public Prescription getPrescriptionById(UUID id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
    }

    @Transactional
    public Prescription createPrescription(UUID appointmentId, String diagnosis, String medications, String interactionOverrideReason) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Prescription prescription = new Prescription();
        prescription.setAppointment(appointment);
        prescription.setPatient(appointment.getPatient());
        prescription.setDoctor(appointment.getDoctor());
        prescription.setDiagnosis(diagnosis);
        prescription.setMedications(medications);

        // Simple mock drug interaction check. In production, we request the AI-service.
        if (medications.toLowerCase().contains("ibuprofen") && medications.toLowerCase().contains("aspirin")) {
            prescription.setInteractionStatus("MODERATE_WARNING");
            if (interactionOverrideReason == null || interactionOverrideReason.isEmpty()) {
                throw new RuntimeException("MODERATE drug interaction detected (Ibuprofen + Aspirin). Override reason required.");
            }
            prescription.setVersionChain("OVERRIDDEN: " + interactionOverrideReason);
        } else {
            prescription.setInteractionStatus("CLEAR");
        }

        Prescription saved = prescriptionRepository.save(prescription);

        // Publish Kafka Event
        publishKafkaEvent("prescription.created", String.format("{\"prescriptionId\":\"%s\",\"patientId\":\"%s\",\"medications\":%s}",
                saved.getId(), appointment.getPatient().getId(), medications));

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
