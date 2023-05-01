package com.example.music_player.controller;


import com.example.music_player.model.Message;
import com.example.music_player.repository.MessageRepository;
import com.example.music_player.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/message")
@CrossOrigin
public class MessageController {

    @Autowired
    MessageService messageService;
    @Autowired
    MessageRepository messageRepository;

            @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
            @PostMapping
            @CrossOrigin(origins = "*", allowedHeaders = "*")
            public Message creatMessage(@RequestBody Map<String, String> payload){

                 Message message= new Message(payload.get("username"),payload.get("title"),payload.get("messageBody"));
                return messageRepository.save(message);
            }

            @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
            @GetMapping("/{username}")
            @CrossOrigin(origins = "*", allowedHeaders = "*")
            public List<Message> getMessageByUsername(@PathVariable String username){
                return messageService.findMessByUsername(username);

            }
}
