package com.hapms.reporting;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
@RestController
public class ReportingServiceApplication {

    private final AuditLogRepository auditLogRepository;

    public ReportingServiceApplication(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(ReportingServiceApplication.class, args);
    }

    @GetMapping("/api/v1/reports/audit-trail")
    public ResponseEntity<List<AuditLog>> getAuditTrail() {
        return ResponseEntity.ok(auditLogRepository.findAll());
    }

    @KafkaListener(topics = {"appointment.created", "appointment.cancelled", "billing.completed", "prescription.created"}, groupId = "reporting-group")
    public void listenEvents(String message) {
        AuditLog log = new AuditLog();
        log.setId(UUID.randomUUID());
        log.setEventType("KAFKA_EVENT");
        log.setEventData(message);
        log.setCreatedAt(LocalDateTime.now());
        auditLogRepository.save(log);
        System.out.println("AUDIT LOGGED: " + message);
    }
}

@Entity
@Table(name = "audit_logs")
class AuditLog {
    @Id
    private UUID id;
    private String eventType;
    private String eventData;
    private LocalDateTime createdAt;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getEventData() { return eventData; }
    public void setEventData(String eventData) { this.eventData = eventData; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

@Repository
interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {}
