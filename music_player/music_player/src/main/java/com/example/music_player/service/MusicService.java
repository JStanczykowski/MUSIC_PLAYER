package com.example.music_player.service;

import com.example.music_player.model.music;
import com.example.music_player.repository.MusicRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusicService {

    @Autowired
    private MusicRepository musicRepository;

    public List<music> findAllMusic() {return musicRepository.findAll();}

    public Optional<music> singleMusic(String number){
        return musicRepository.findByNumber(number);
    }
    public Optional<music> singleMusicByID(ObjectId id){
        return musicRepository.findById(id);
    }
    public void deleteSingleMusic(Optional<music> music) {
        music.ifPresent(musicRepository::delete);
    }

}
