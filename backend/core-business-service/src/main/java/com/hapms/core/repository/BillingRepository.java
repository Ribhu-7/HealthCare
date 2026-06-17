package com.hapms.core.repository;

import com.hapms.core.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BillingRepository extends JpaRepository<Billing, UUID> {
    List<Billing> findByPatientId(UUID patientId);
    Optional<Billing> findByAppointmentId(UUID appointmentId);
}
