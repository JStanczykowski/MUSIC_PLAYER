package com.example.music_player.message.controller;

import com.example.music_player.controller.MessageController;
import com.example.music_player.model.Message;
import com.example.music_player.service.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test")
class MessageControllerTest {

    @Mock
    private MessageService messageService;

    @InjectMocks
    private MessageController messageController;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreateMessageEndpoint() throws Exception {
        // Given
        Map<String, String> payload = new HashMap<>();
        payload.put("username", "testUser");
        payload.put("title", "Test Title");
        payload.put("messageBody", "Test Message Body");

        Date createDate = new Date();
        Message expectedMessage = new Message("testUser", "Test Title", "Test Message Body", createDate);

        when(messageService.createMessage(anyString(), anyString(), anyString())).thenReturn(expectedMessage);

        ResultActions resultActions = mockMvc.perform(post("/api/v1/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(expectedMessage.getUsername()))
                .andExpect(jsonPath("$.title").value(expectedMessage.getTitle()))
                .andExpect(jsonPath("$.messageBody").value(expectedMessage.getMessageBody()));
    }
}