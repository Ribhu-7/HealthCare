package com.hapms.core.repository;

import com.hapms.core.model.Patient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@ActiveProfiles("test")
public class PatientRepositoryTest {

    @Autowired
    private PatientRepository patientRepository;

    @Test
    public void testSavePatient() {
        Patient p = new Patient();
        p.setFirstName("John");
        p.setLastName("Doe");
        p.setGender("Male");
        p.setContactNumber("555-0100");
        p.setDateOfBirth(java.time.LocalDate.of(1990, 1, 1));
        p.setMrn("MRN-TEST-001");
        
        Patient saved = patientRepository.save(p);
        assertNotNull(saved.getId());
    }
}
