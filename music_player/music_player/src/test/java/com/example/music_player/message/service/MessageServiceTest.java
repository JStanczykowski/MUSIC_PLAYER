package com.example.music_player.message.service;

import com.example.music_player.model.Message;
import com.example.music_player.repository.MessageRepository;
import com.example.music_player.service.MessageService;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test")
public class MessageServiceTest {

    @Mock
    MessageRepository messageRepository;

    @InjectMocks
    MessageService messageService;

    @Test
    public void MessageRepositoryShouldReturnUserMessage() {
        ObjectId objectId = new ObjectId();

        Message message = new Message(objectId, "test", "test", "test test test", true);

        List<Map<String, Object>> messageList = new ArrayList<>();
        List<Message> messages = Collections.singletonList(message);

        for (Message messageSingle : messages) {
            Map<String, Object> playlistMap = new HashMap<>();
            if (message.isActive()) {
                playlistMap.put("id", String.valueOf(message.getId()));
                playlistMap.put("username", message.getUsername());
                playlistMap.put("title", message.getTitle());
                playlistMap.put("messageBody", message.getMessageBody());
                playlistMap.put("reply", message.getReply());
                playlistMap.put("active", String.valueOf(message.isActive()));

                messageList.add(playlistMap);
            }
        }


        List<Message> mappedMessageList = messageList.stream()
                .map(this::mapToMessage)
                .collect(Collectors.toList());

        messageRepository.save(message);
        when(messageRepository.findByUsername("test")).thenReturn(mappedMessageList);

        assertNotNull(mappedMessageList);
        assertEquals(mappedMessageList, Collections.singletonList(message));
    }

    private Message mapToMessage(Map<String, Object> map) {
        ObjectId id = new ObjectId((String) map.get("id"));
        String username = (String) map.get("username");
        String title = (String) map.get("title");
        String messageBody = (String) map.get("messageBody");
        boolean active = Boolean.parseBoolean((String) map.get("active"));

        return new Message(id, username, title, messageBody, active);
    }




}