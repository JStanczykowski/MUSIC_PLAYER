package com.example.music_player.controller;
import com.example.music_player.service.MusicService;
import com.example.music_player.model.Music;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/music")
@CrossOrigin
public class MusicController {


    private final MusicService musicService;

    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Music>> getMusic(){
             return new ResponseEntity<List<Music>>(musicService.getAllMusicPersonal(), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping("/getMusicByGenre")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Music>> getMusicByGenre(@RequestParam List<String> genres){
        return new ResponseEntity<List<Music>>(musicService.getMusicByGenre(genres), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping("/{number}")
    @CrossOrigin
    public ResponseEntity<Optional<Music>> getSingleMusic(@PathVariable ObjectId number){
        return new ResponseEntity<Optional<Music>>(musicService.singleMusicByID(number), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping("/artist")
    @CrossOrigin
    public Map<String, List<Music>> getSingleMusic(){
        return musicService.fidArtis();
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void deleteSingleMusic(@PathVariable ObjectId id) {
        if (musicService.singleMusicByID(id).isPresent()) {
            musicService.deleteSingleMusic(musicService.singleMusicByID(id));
        }
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void addMusicToDataBase(@RequestBody Map<String, String> payload){
        musicService.addMusic(payload.get("artist"),payload.get("file"),payload.get("picture"),payload.get("title"),payload.get("genre"));
    }
}
