package com.example.music_player.service;

import com.example.music_player.model.music;
import com.example.music_player.repository.MusicRepository;
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

}
