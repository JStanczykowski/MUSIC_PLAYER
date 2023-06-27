package com.example.music_player.controller;


import com.example.music_player.repository.MusicRepository;
import com.example.music_player.service.MusicService;
import com.example.music_player.model.Music;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/music")
@CrossOrigin
public class MusicController {
    @Autowired
    private MusicService musicService;

    @Autowired
    private MusicRepository musicRepository;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Music>> getMusic(){
        List<Music> musicList = musicService.findAllMusic();
        List<Music> musicDTOList = musicList.stream().map(m -> new Music(m.getId(), m.getNumber(), m.getTytul(), m.getArtysta(), m.getPlik())).collect(Collectors.toList());
        return new ResponseEntity<List<Music>>(musicDTOList, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping("/{number}")
    @CrossOrigin
    public ResponseEntity<Optional<Music>> getSingleMusic(@PathVariable ObjectId number){
        return new ResponseEntity<Optional<Music>>(musicService.singleMusicByID(number), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void deleteSingleMusic(@PathVariable ObjectId id) {

        if (musicService.singleMusicByID(id).isPresent()) {

            musicService.deleteSingleMusic(musicService.singleMusicByID(id));
        }
    }
}
