package com.example.music_player.controller;

import com.example.music_player.model.PlayList;
import com.example.music_player.model.Music;
import com.example.music_player.repository.PlayListRepository;
import com.example.music_player.service.PlayListService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/playlist")
@CrossOrigin
public class PlayListController {

    private final PlayListService playListService;

    public PlayListController(PlayListService playListService) {
        this.playListService = playListService;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MODER')")
    @GetMapping("/names/{owner}")
    @CrossOrigin
    public List<Map<String, String>> getPlaylistsByOwner(@PathVariable String owner) {
        return playListService.getPlayListByOwner(owner);
    }

@PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MODER')")
@GetMapping("/{playlistId}/musicIds")
@CrossOrigin
public List<Music> getMusicIdsByPlayListId(@PathVariable String playlistId) {
  return playListService.getMusicByPlayListId(playlistId);
}

    @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
    @PostMapping
    @CrossOrigin
    public ResponseEntity createPlayList(@RequestBody Map<String,String> payload){

        return ResponseEntity.ok()
                .body(playListService.createPlayList(payload.get("name"),payload.get("username")));

    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
    @DeleteMapping("/{playlistId}/deletePlayList")
    @CrossOrigin(origins = "http://localhost:3000")
    public void deletePlaylist(@PathVariable("playlistId") String playlistId) throws ChangeSetPersister.NotFoundException {
        playListService.deletePlayList(playlistId);
    }

@PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
@PostMapping("/{playlistId}/addMusic")
@CrossOrigin(origins = "http://localhost:3000")
public ResponseEntity addMusicToPlaylist(@PathVariable("playlistId") String playlistId,
                                         @RequestBody List<String> musicIds) throws ChangeSetPersister.NotFoundException {

    return ResponseEntity.ok()
            .body(playListService.addMusicToPlayListPost(playlistId,musicIds));
}

}
