package com.example.music_player.service;

import com.example.music_player.model.Message;
import com.example.music_player.repository.MessageRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MessageService {

@Autowired
    MessageRepository messageRepository;

    public List<Message> findAllMess() {return messageRepository.findAll();}

    public List<Message> findMessByUsername(String username) {return messageRepository.findByUsername(username);}
    public Message createMessage(String username, String title, String messageBody){

        Message message= new Message(username,title,messageBody);
        return messageRepository.save(message);
    }
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
    public void replyMessage(ObjectId id,String reply) throws ChangeSetPersister.NotFoundException{
        Message message = messageRepository.findById(id).orElseThrow(() -> new ChangeSetPersister.NotFoundException());;

        messageRepository.delete(message);
        message.setActive(false);
        message.setReply(reply);
        messageRepository.save(message);

    }
}
