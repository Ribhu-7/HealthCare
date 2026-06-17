package com.hapms.ai.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@CrossOrigin(origins = "*") // Allow frontend access
public class ChatController {

    private final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    @org.springframework.beans.factory.annotation.Value("${OPENAI_API_KEY}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> handleChat(@RequestBody Map<String, String> request) {
        String userMessage = request.getOrDefault("message", "");

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-4o-mini"); // default cost-effective model

            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content",
                    "You are the HAPMS Clinical Intelligence Engine, an advanced AI embedded in a healthcare portal. Provide concise, professional, and accurate medical administrative/clinical responses. Be helpful and confident.");
            messages.add(systemMessage);

            Map<String, String> userMsgMap = new HashMap<>();
            userMsgMap.put("role", "user");
            userMsgMap.put("content", userMessage);
            messages.add(userMsgMap);

            requestBody.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> openAiResponse = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, entity,
                    Map.class);

            Map<String, Object> body = openAiResponse.getBody();
            List<Map<String, Object>> choices = (List<Map<String, Object>>) body.get("choices");
            Map<String, Object> firstChoice = choices.get(0);
            Map<String, Object> messageObj = (Map<String, Object>) firstChoice.get("message");
            String aiContent = (String) messageObj.get("content");

            Map<String, String> response = new HashMap<>();
            response.put("response", aiContent);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("response", "Error processing request: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
