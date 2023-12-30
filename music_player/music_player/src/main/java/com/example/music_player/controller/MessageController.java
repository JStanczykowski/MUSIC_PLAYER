package com.example.music_player.controller;


import com.example.music_player.model.Message;
import com.example.music_player.service.MessageService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/message")
@CrossOrigin
public class MessageController {

    @Autowired
    MessageService messageService;



            @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
            @PostMapping
            @CrossOrigin(origins = "*", allowedHeaders = "*")
            public Message creatMessage(@RequestBody Map<String, String> payload){

                return messageService.createMessage(payload.get("username"),payload.get("title"),payload.get("messageBody"));

            }

            @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
            @GetMapping("/{username}")
            @CrossOrigin(origins = "*", allowedHeaders = "*")
            public List<Map<String, Object>> getMessageByUsername(@PathVariable String username){
                return messageService.findMessByUsername(username);

            }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Map<String, Object>> getAllMessage(){
        return messageService.getAllMessage();
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void replyMessage(@PathVariable ObjectId id,@RequestBody Map<String, String> payload) throws ChangeSetPersister.NotFoundException {
         messageService.replyMessage(id,payload.get("reply"),payload.get("username"));
            }
}
