package com.hapms.core.service;

import com.hapms.core.model.Department;
import com.hapms.core.model.Doctor;
import com.hapms.core.model.AppointmentSlot;
import com.hapms.core.repository.DepartmentRepository;
import com.hapms.core.repository.DoctorRepository;
import com.hapms.core.repository.AppointmentSlotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final AppointmentSlotRepository slotRepository;

    public DoctorService(DoctorRepository doctorRepository,
                         DepartmentRepository departmentRepository,
                         AppointmentSlotRepository slotRepository) {
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
        this.slotRepository = slotRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(UUID id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor getDoctorByUserId(UUID userId) {
        return doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found for this user"));
    }

    @Transactional
    public Doctor createDoctor(Doctor doctor, UUID departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        doctor.setDepartment(department);
        doctor.setStatus("ACTIVE");
        return doctorRepository.save(doctor);
    }

    @Transactional
    public void generateWeeklySlots(UUID doctorId, LocalDate startDate, LocalDate endDate, 
                                     LocalTime start, LocalTime end, int durationMinutes) {
        Doctor doctor = getDoctorById(doctorId);
        List<AppointmentSlot> slots = new ArrayList<>();

        LocalDate current = startDate;
        while (!current.isAfter(endDate)) {
            LocalTime temp = start;
            while (temp.plusMinutes(durationMinutes).isBefore(end) || temp.plusMinutes(durationMinutes).equals(end)) {
                // Check if slot already exists
                if (slotRepository.findByDoctorIdAndSlotDateAndStartTime(doctorId, current, temp).isEmpty()) {
                    AppointmentSlot slot = new AppointmentSlot();
                    slot.setDoctor(doctor);
                    slot.setSlotDate(current);
                    slot.setStartTime(temp);
                    slot.setEndTime(temp.plusMinutes(durationMinutes));
                    slot.setStatus("AVAILABLE");
                    slots.add(slot);
                }
                temp = temp.plusMinutes(durationMinutes);
            }
            current = current.plusDays(1);
        }
        slotRepository.saveAll(slots);
    }

    public List<AppointmentSlot> getAvailableSlots(UUID doctorId, LocalDate date) {
        return slotRepository.findByDoctorIdAndSlotDate(doctorId, date);
    }
}
