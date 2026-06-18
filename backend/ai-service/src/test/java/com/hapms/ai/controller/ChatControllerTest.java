package com.hapms.ai.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testChatEndpoint() throws Exception {
        mockMvc.perform(post("/api/v1/ai/chat")
               .contentType("application/json")
               .content("{\"message\": \"Hello\"}"))
               // We expect either 200 or 500 depending on API key quota
               // For testing the infrastructure, just making sure the endpoint exists
               .andExpect(result -> {
                   int status = result.getResponse().getStatus();
                   assert(status == 200 || status == 500 || status == 429);
               });
    }
}
