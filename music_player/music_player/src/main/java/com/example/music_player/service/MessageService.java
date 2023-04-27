package com.example.music_player.service;

import com.example.music_player.model.Message;
import com.example.music_player.model.music;
import com.example.music_player.repository.MessageRepository;
import io.netty.handler.codec.MessageAggregator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

@Autowired
    MessageRepository messageRepository;

    public List<Message> findAllMess() {return messageRepository.findAll();}
}
