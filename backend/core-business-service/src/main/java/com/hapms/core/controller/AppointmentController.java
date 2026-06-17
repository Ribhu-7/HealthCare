package com.hapms.core.controller;

import com.hapms.core.model.Appointment;
import com.hapms.core.service.AppointmentService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Map<String, Object> request) {
        UUID patientId = UUID.fromString((String) request.get("patientId"));
        UUID doctorId = UUID.fromString((String) request.get("doctorId"));
        LocalDate date = LocalDate.parse((String) request.get("appointmentDate"));
        LocalTime startTime = LocalTime.parse((String) request.get("startTime"));
        String type = (String) request.get("type");
        String reason = (String) request.get("reason");

        Appointment booked = appointmentService.bookAppointment(patientId, doctorId, date, startTime, type, reason);
        return ResponseEntity.status(HttpStatus.CREATED).body(booked);
    }

    @PutMapping("/{id}/check-in")
    public ResponseEntity<Appointment> checkIn(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(appointmentService.checkIn(id));
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<Appointment> startConsultation(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(appointmentService.startConsultation(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Appointment> completeConsultation(@PathVariable("id") UUID id, @RequestBody Map<String, String> body) {
        String notes = body.get("notes");
        return ResponseEntity.ok(appointmentService.completeConsultation(id, notes));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable("id") UUID id, @RequestBody Map<String, String> body) {
        String reason = body.get("reason");
        return ResponseEntity.ok(appointmentService.cancelAppointment(id, reason));
    }
}
