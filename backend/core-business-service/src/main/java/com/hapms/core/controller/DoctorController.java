package com.hapms.core.controller;

import com.hapms.core.model.Doctor;
import com.hapms.core.model.AppointmentSlot;
import com.hapms.core.service.DoctorService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Doctor> getDoctorByUserId(@PathVariable("userId") UUID userId) {
        return ResponseEntity.ok(doctorService.getDoctorByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor, @RequestParam("departmentId") UUID departmentId) {
        Doctor created = doctorService.createDoctor(doctor, departmentId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/generate-slots")
    public ResponseEntity<Void> generateSlots(
            @PathVariable("id") UUID id,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime,
            @RequestParam("durationMinutes") int durationMinutes) {
        doctorService.generateWeeklySlots(id, startDate, endDate, 
                LocalTime.parse(startTime), LocalTime.parse(endTime), durationMinutes);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/slots")
    public ResponseEntity<List<AppointmentSlot>> getSlots(
            @PathVariable("id") UUID id,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(doctorService.getAvailableSlots(id, date));
    }
}
