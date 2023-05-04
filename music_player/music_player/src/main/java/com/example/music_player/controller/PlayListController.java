package com.example.music_player.controller;

import com.example.music_player.model.PlayList;
import com.example.music_player.model.music;
import com.example.music_player.repository.PlayListRepository;
import com.example.music_player.service.PlayListService;
import com.example.music_player.service.ResourceNotFoundException;
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
    @Autowired
    private PlayListService playListService;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private PlayListRepository playListRepository;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MODER')")
    @GetMapping("/names/{owner}")
    @CrossOrigin
    public List<Map<String, String>> getPlaylistsByOwner(@PathVariable String owner) {
        List<PlayList> playlists = playListRepository.findByOwner(owner);
        List<Map<String, String>> playlistData = new ArrayList<>();

        for (PlayList playlist : playlists) {
            Map<String, String> playlistMap = new HashMap<>();
            System.out.println(String.valueOf(playlist.getId()));
            playlistMap.put("id", String.valueOf(playlist.getId()));
            playlistMap.put("name", playlist.getName());
            playlistData.add(playlistMap);
        }
        return playlistData;
    }

@PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MODER')")
@GetMapping("/{playlistId}/musicIds")
@CrossOrigin
public List<music> getMusicIdsByPlayListId(@PathVariable String playlistId) {
    Optional<PlayList> optionalPlayList = playListRepository.findById(new ObjectId(playlistId));
    if (optionalPlayList.isPresent()) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("_id").is(new ObjectId(playlistId))),
                Aggregation.unwind("musicIds"),
                Aggregation.lookup("music", "musicIds", "_id", "songs"),
                Aggregation.unwind("songs"),
                Aggregation.project()
                        .and("songs.tytul").as("tytul")
                        .and("songs.artysta").as("artysta")
                        .and("songs.plik").as("plik")
                        .and("songs.zdjecie").as("zdjecie")
        );
        AggregationResults<music> results = mongoTemplate.aggregate(aggregation, "playlist", music.class);
        List<music> mappedResults = results.getMappedResults();
        if (mappedResults.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No music found for the given playlist");
        }
        return mappedResults;
    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found");
    }
}

    @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
    @PostMapping
    @CrossOrigin
    public PlayList createPlayList(@RequestBody Map<String,String> payload){
        PlayList playlist = new PlayList();
        playlist.setName(payload.get("name"));
        playlist.setOwner(payload.get("username"));
        return playListRepository.save(playlist);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
    @DeleteMapping("/{playlistId}/deletePlayList")
    @CrossOrigin(origins = "http://localhost:3000")
    public void deletePlaylist(@PathVariable("playlistId") String playlistId) throws ChangeSetPersister.NotFoundException {
        ObjectId playlistObjectId = new ObjectId(playlistId);
        PlayList playlist = playListRepository.findById(playlistObjectId)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        playListRepository.delete(playlist);
    }
//zrob drugi endpoint gdzie bedziesz zwracał wszystko oprocz reviews i bedzie gituwa
@PreAuthorize("hasAnyRole('USER','ADMIN','MODER')")
@PostMapping("/{playlistId}/addMusic")
@CrossOrigin(origins = "http://localhost:3000")
public ResponseEntity addMusicToPlaylist(@PathVariable("playlistId") String playlistId,
                                         @RequestBody List<String> musicIds) throws ChangeSetPersister.NotFoundException {
    ObjectId playlistObjectId = new ObjectId(playlistId);
    PlayList playlist = playListRepository.findById(playlistObjectId)
            .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
    List<ObjectId> existingMusicIds = playlist.getMusicIds();
    List<ObjectId> newMusicIds = musicIds.stream()
            .map(ObjectId::new)
            .filter(id -> !existingMusicIds.contains(id))
            .collect(Collectors.toList());
    existingMusicIds.addAll(newMusicIds);
    playlist.setMusicIds(existingMusicIds);
    playListRepository.save(playlist);
    return ResponseEntity.ok()
            .body(playlist);
}

}
