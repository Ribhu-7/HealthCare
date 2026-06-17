package com.hapms.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class NotificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @GetMapping("/api/v1/notifications/health")
    public String health() {
        return "Notification Service is Healthy";
    }

    @KafkaListener(topics = "appointment.created", groupId = "notif-group")
    public void listenAppointmentCreated(String message) {
        System.out.println("SIMULATION: Sent appointment booking confirmation email/SMS: " + message);
    }

    @KafkaListener(topics = "billing.completed", groupId = "notif-group")
    public void listenBillingCompleted(String message) {
        System.out.println("SIMULATION: Sent invoice receipt email: " + message);
    }
}
