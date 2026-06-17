package com.hapms.core.repository;

import com.hapms.core.model.AppointmentSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, UUID> {
    List<AppointmentSlot> findByDoctorIdAndSlotDate(UUID doctorId, LocalDate slotDate);
    Optional<AppointmentSlot> findByDoctorIdAndSlotDateAndStartTime(UUID doctorId, LocalDate slotDate, LocalTime startTime);
}
