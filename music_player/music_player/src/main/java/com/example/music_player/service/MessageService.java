package com.example.music_player.service;

import com.example.music_player.model.Message;
import com.example.music_player.repository.MessageRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageService {

@Autowired
    MessageRepository messageRepository;

    public List<Message> findAllMess() {return messageRepository.findAll();}

    public List<Map<String, Object>> findMessByUsername(String username) {
        List<Message> messages = messageRepository.findByUsername(username);
        List<Map<String, Object>> messageList = new ArrayList<>();

        for (Message message : messages) {
            Map<String, Object> playlistMap = new HashMap<>();
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
    public Message createMessage(String username, String title, String messageBody){
        Date createAt = new Date();
        Message message= new Message(username,title,messageBody,createAt);
        return messageRepository.save(message);
    }
    public List<Map<String, Object>> getAllMessage(){
        List<Message> messages = messageRepository.findAll();

        List<Map<String, Object>> messageList = new ArrayList<>();

        for (Message message : messages) {
            Map<String, Object> playlistMap = new HashMap<>();
            if(message.isActive()) {
                playlistMap.put("id", String.valueOf(message.getId()));
                playlistMap.put("username", message.getUsername());
                playlistMap.put("title", message.getTitle());
                playlistMap.put("messageBody", message.getMessageBody());
                playlistMap.put("reply", message.getReply());
                playlistMap.put("createAt",message.getCreateAt());
                playlistMap.put("active", String.valueOf(message.isActive()));

                messageList.add(playlistMap);
            }
        }
        return messageList;
    }
    public void replyMessage(ObjectId id,String reply,String username) throws ChangeSetPersister.NotFoundException{
        Message message = messageRepository.findById(id).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        ObjectId objectId = new ObjectId();
        Date date = new Date();
        Message message1 = new Message(objectId,username,message.getTitle(),reply,date);
        messageRepository.delete(message);
        message1.setActive(false);
        messageRepository.save(message1);
        message.addReply(Collections.singletonList(message1));
        messageRepository.save(message);

    }
}
