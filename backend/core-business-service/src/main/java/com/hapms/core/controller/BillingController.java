package com.hapms.core.controller;

import com.hapms.core.model.Billing;
import com.hapms.core.service.BillingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping
    public ResponseEntity<List<Billing>> getAllBills() {
        return ResponseEntity.ok(billingService.getAllBills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillById(@PathVariable UUID id) {
        return ResponseEntity.ok(billingService.getBillById(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Billing>> getBillsByPatient(@PathVariable UUID patientId) {
        return ResponseEntity.ok(billingService.getBillsByPatient(patientId));
    }

    @PostMapping
    public ResponseEntity<Billing> generateBill(@RequestBody Map<String, Object> request) {
        UUID appointmentId = UUID.fromString((String) request.get("appointmentId"));
        String lineItems = (String) request.get("lineItems");
        BigDecimal subtotal = new BigDecimal(request.get("subtotal").toString());
        BigDecimal insuranceAdj = request.get("insuranceAdj") != null ? new BigDecimal(request.get("insuranceAdj").toString()) : BigDecimal.ZERO;
        BigDecimal discount = request.get("discount") != null ? new BigDecimal(request.get("discount").toString()) : BigDecimal.ZERO;

        Billing created = billingService.generateBill(appointmentId, lineItems, subtotal, insuranceAdj, discount);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<Billing> recordPayment(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        String paymentMethod = body.get("paymentMethod");
        Billing updated = billingService.recordPayment(id, paymentMethod != null ? paymentMethod : "CASH");
        return ResponseEntity.ok(updated);
    }
}
