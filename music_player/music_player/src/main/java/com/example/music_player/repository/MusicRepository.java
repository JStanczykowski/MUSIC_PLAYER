package com.example.music_player.repository;

import com.example.music_player.model.Music;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.Optional;
import java.util.List;
@Repository
public interface MusicRepository extends MongoRepository<Music, ObjectId> {
    Optional<Music> findByNumber(String number);
    Optional<Music> findById (ObjectId id);
    List <Music> findByGenre (String genre);

    void delete(Music music);
}
