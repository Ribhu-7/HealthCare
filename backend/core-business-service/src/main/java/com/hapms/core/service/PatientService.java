package com.hapms.core.service;

import com.hapms.core.model.Patient;
import com.hapms.core.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(UUID id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient getPatientByUserId(UUID userId) {
        return patientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Patient profile not found for this user"));
    }

    @Transactional
    public Patient createPatient(Patient patient) {
        if (patient.getMrn() == null || patient.getMrn().isEmpty()) {
            patient.setMrn("MRN-" + LocalDate.now().getYear() + "-" + (10000 + new Random().nextInt(90000)));
        }
        return patientRepository.save(patient);
    }

    @Transactional
    public Patient updatePatient(UUID id, Patient updated) {
        Patient existing = getPatientById(id);
        if (updated.getFirstName() != null) existing.setFirstName(updated.getFirstName());
        if (updated.getLastName() != null) existing.setLastName(updated.getLastName());
        if (updated.getEmail() != null) existing.setEmail(updated.getEmail());
        if (updated.getContactNumber() != null) existing.setContactNumber(updated.getContactNumber());
        if (updated.getDateOfBirth() != null) existing.setDateOfBirth(updated.getDateOfBirth());
        if (updated.getGender() != null) existing.setGender(updated.getGender());
        if (updated.getBloodGroup() != null) existing.setBloodGroup(updated.getBloodGroup());
        if (updated.getAllergies() != null) existing.setAllergies(updated.getAllergies());
        if (updated.getInsurance() != null) existing.setInsurance(updated.getInsurance());
        if (updated.getEmergencyContact() != null) existing.setEmergencyContact(updated.getEmergencyContact());
        return patientRepository.save(existing);
    }
}
