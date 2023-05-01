package com.example.music_player.repository;

import com.example.music_player.model.Message;
import com.example.music_player.model.PlayList;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, ObjectId> {
    List<Message> findByUsername(String username);

}
