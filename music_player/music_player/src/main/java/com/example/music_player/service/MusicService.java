package com.example.music_player.service;

import com.example.music_player.model.Music;
import com.example.music_player.repository.MusicRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MusicService {

    @Autowired
    private MusicRepository musicRepository;

    public List<Music> findAllMusic() {return musicRepository.findAll();}
    public List<Music> getAllMusicPersonal(){
        List<Music> musicList = findAllMusic();
        List<Music> musicDTOList = musicList.stream().map(m -> new Music(m.getId(), m.getNumber(), m.getTytul(), m.getArtysta(), m.getPlik())).collect(Collectors.toList());
        return musicDTOList;
    }
    public Optional<Music> singleMusic(String number){
        return musicRepository.findByNumber(number);
    }
    public Optional<Music> singleMusicByID(ObjectId id){
        return musicRepository.findById(id);
    }
    public void deleteSingleMusic(Optional<Music> music) {
        music.ifPresent(musicRepository::delete);
    }

}
