package com.example.music_player.repository;

import com.example.music_player.model.music;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MusicRepository extends MongoRepository<music, ObjectId> {
    Optional<music> findByNumber(String number);
}
