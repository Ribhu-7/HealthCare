package com.hapms.core.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @JdbcTypeCode(SqlTypes.JSON)
    private String diagnosis;

    @JdbcTypeCode(SqlTypes.JSON)
    private String medications;

    @Column(name = "interaction_status")
    private String interactionStatus;

    @Column(nullable = false)
    private String status;

    @Column(name = "version_chain")
    private String versionChain;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Version
    private Integer version;

    public Prescription() {
        this.id = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Appointment getAppointment() { return appointment; }
    public void setAppointment(Appointment appointment) { this.appointment = appointment; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public String getMedications() { return medications; }
    public void setMedications(String medications) { this.medications = medications; }
    public String getInteractionStatus() { return interactionStatus; }
    public void setInteractionStatus(String interactionStatus) { this.interactionStatus = interactionStatus; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getVersionChain() { return versionChain; }
    public void setVersionChain(String versionChain) { this.versionChain = versionChain; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }
}
