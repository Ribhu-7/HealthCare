package com.hapms.core.controller;

import com.hapms.core.model.Prescription;
import com.hapms.core.service.PrescriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable UUID id) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionById(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByPatient(@PathVariable UUID patientId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByPatient(patientId));
    }

    @PostMapping
    public ResponseEntity<Prescription> createPrescription(@RequestBody Map<String, Object> request) {
        UUID appointmentId = UUID.fromString((String) request.get("appointmentId"));
        String diagnosis = (String) request.get("diagnosis");
        String medications = (String) request.get("medications");
        String overrideReason = (String) request.get("overrideReason");

        Prescription created = prescriptionService.createPrescription(appointmentId, diagnosis, medications, overrideReason);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
