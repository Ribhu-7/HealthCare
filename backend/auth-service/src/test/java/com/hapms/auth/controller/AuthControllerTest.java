package com.hapms.auth.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testLoginEndpointExists() throws Exception {
        // Just verify the endpoint is reachable (may return 400 without body)
        mockMvc.perform(post("/api/v1/auth/login"))
               .andExpect(result -> {
                   int statusCode = result.getResponse().getStatus();
                   assert(statusCode == 400 || statusCode == 401 || statusCode == 415);
               });
    }
}
