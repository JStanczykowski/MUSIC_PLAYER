package com.example.music_player.controller;


import com.example.music_player.model.Message;
import com.example.music_player.repository.MessageRepository;
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
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Map<String, String>> getAllMessage(){
        List<Message> messages = messageRepository.findAll();

        List<Map<String, String>> messageList = new ArrayList<>();

        for (Message message : messages) {
            Map<String, String> playlistMap = new HashMap<>();
            if(message.isActive()) {
                playlistMap.put("id", String.valueOf(message.getId()));
                playlistMap.put("username", message.getUsername());
                playlistMap.put("title", message.getTitle());
                playlistMap.put("messageBody", message.getMessageBody());
                playlistMap.put("reply", message.getReply());
                playlistMap.put("active", String.valueOf(message.isActive()));

                messageList.add(playlistMap);
            }
            }
        return messageList;

    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void replyMessage(@PathVariable ObjectId id,@RequestBody Map<String, String> payload) throws ChangeSetPersister.NotFoundException {

                            Message message = messageRepository.findById(id).orElseThrow(() -> new ChangeSetPersister.NotFoundException());;

                            messageRepository.delete(message);
                            message.setActive(false);
                    message.setReply(payload.get("reply"));
                        messageRepository.save(message);
    }
}
