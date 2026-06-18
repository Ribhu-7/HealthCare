package com.hapms.core.service;

import com.hapms.core.model.Appointment;
import com.hapms.core.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppointmentServiceTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @InjectMocks
    private AppointmentService appointmentService;

    @Test
    public void testGetAllAppointments() {
        Appointment appt1 = new Appointment();
        appt1.setStatus("SCHEDULED");
        Appointment appt2 = new Appointment();
        appt2.setStatus("COMPLETED");

        when(appointmentRepository.findAll()).thenReturn(Arrays.asList(appt1, appt2));

        List<Appointment> result = appointmentService.getAllAppointments();
        assertEquals(2, result.size());
    }
}
