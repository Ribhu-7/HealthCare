package com.hapms.core.service;

import com.hapms.core.model.Appointment;
import com.hapms.core.model.AppointmentSlot;
import com.hapms.core.model.Doctor;
import com.hapms.core.model.Patient;
import com.hapms.core.repository.AppointmentRepository;
import com.hapms.core.repository.AppointmentSlotRepository;
import com.hapms.core.repository.DoctorRepository;
import com.hapms.core.repository.PatientRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentSlotRepository slotRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              AppointmentSlotRepository slotRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              KafkaTemplate<String, String> kafkaTemplate) {
        this.appointmentRepository = appointmentRepository;
        this.slotRepository = slotRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByPatient(UUID patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctor(UUID doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public Appointment getAppointmentById(UUID id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    @Transactional
    public Appointment bookAppointment(UUID patientId, UUID doctorId, LocalDate date, LocalTime startTime, String type, String reason) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Optimistic locking concurrency check on the slot
        AppointmentSlot slot = slotRepository.findByDoctorIdAndSlotDateAndStartTime(doctorId, date, startTime)
                .orElseGet(() -> {
                    AppointmentSlot newSlot = new AppointmentSlot();
                    newSlot.setDoctor(doctor);
                    newSlot.setSlotDate(date);
                    newSlot.setStartTime(startTime);
                    newSlot.setEndTime(startTime.plusMinutes(30));
                    newSlot.setStatus("AVAILABLE");
                    return slotRepository.save(newSlot);
                });

        if (!"AVAILABLE".equals(slot.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This time slot is already booked. Please select a different time.");
        }

        // Mark slot booked
        slot.setStatus("BOOKED");
        slotRepository.save(slot);

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setDepartment(doctor.getDepartment());
        appointment.setAppointmentDate(date);
        appointment.setStartTime(startTime);
        appointment.setEndTime(slot.getEndTime());
        appointment.setType(type != null ? type : "CONSULTATION");
        appointment.setReason(reason);
        appointment.setQrCode("QR-" + appointment.getId().toString().substring(0, 8));
        appointment.setStatus("SCHEDULED");

        Appointment saved = appointmentRepository.save(appointment);

        // Publish Event
        publishKafkaEvent("appointment.created", String.format("{\"appointmentId\":\"%s\",\"patientId\":\"%s\",\"doctorId\":\"%s\",\"dateTime\":\"%sT%s\",\"status\":\"SCHEDULED\"}",
                saved.getId(), patientId, doctorId, date, startTime));

        return saved;
    }

    @Transactional
    public Appointment checkIn(UUID id) {
        Appointment appointment = getAppointmentById(id);
        if (!"SCHEDULED".equals(appointment.getStatus())) {
            throw new RuntimeException("Appointment is not in SCHEDULED status");
        }
        appointment.setStatus("CHECKED_IN");
        appointment.setCheckedInAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment startConsultation(UUID id) {
        Appointment appointment = getAppointmentById(id);
        if (!"CHECKED_IN".equals(appointment.getStatus())) {
            throw new RuntimeException("Patient must be checked in before starting consultation");
        }
        appointment.setStatus("IN_PROGRESS");
        appointment.setStartedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment completeConsultation(UUID id, String notes) {
        Appointment appointment = getAppointmentById(id);
        if (!"IN_PROGRESS".equals(appointment.getStatus())) {
            throw new RuntimeException("Consultation is not in progress");
        }
        appointment.setStatus("COMPLETED");
        appointment.setNotes(notes);
        appointment.setCompletedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment cancelAppointment(UUID id, String reason) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);

        // Release the slot
        Optional<AppointmentSlot> slotOpt = slotRepository.findByDoctorIdAndSlotDateAndStartTime(
                appointment.getDoctor().getId(), appointment.getAppointmentDate(), appointment.getStartTime());
        slotOpt.ifPresent(slot -> {
            slot.setStatus("AVAILABLE");
            slotRepository.save(slot);
        });

        publishKafkaEvent("appointment.cancelled", String.format("{\"appointmentId\":\"%s\",\"reason\":\"%s\",\"cancelledBy\":\"USER\"}", id, reason));

        return appointment;
    }

    private void publishKafkaEvent(String topic, String payload) {
        try {
            kafkaTemplate.send(topic, payload);
        } catch (Exception e) {
            System.err.println("Failed to publish Kafka event to topic " + topic + ": " + e.getMessage());
        }
    }
}
