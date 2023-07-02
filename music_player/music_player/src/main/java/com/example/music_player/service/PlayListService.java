package com.example.music_player.service;


import com.example.music_player.model.Music;
import com.example.music_player.model.PlayList;
import com.example.music_player.repository.PlayListRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class PlayListService {

    @Autowired
    private PlayListRepository playListRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public PlayList addMusicToPlayListPost(String playlistId,List<String> musicIds) throws ChangeSetPersister.NotFoundException{

            ObjectId playlistObjectId = new ObjectId(playlistId);

            PlayList playlist = playListRepository.findById(playlistObjectId)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);
        System.out.println("music: "+musicIds);
            List<ObjectId> existingMusicIds = playlist.getMusicIds();
        List<ObjectId> newMusicIds = musicIds.stream()
                .filter(Objects::nonNull) // Dodany filtr sprawdzający, czy element nie jest null
                .map(ObjectId::new)
                .filter(id -> !existingMusicIds.contains(id)).toList();
            existingMusicIds.addAll(newMusicIds);

        System.out.println("new music ids"+newMusicIds);
            playlist.setMusicIds(existingMusicIds);
        System.out.println("new music id 2 "+playlist.getMusicIds());
            playListRepository.save(playlist);

            return playlist;

    }
    public void deletePlayList( String playlistId) throws ChangeSetPersister.NotFoundException {
        ObjectId playlistObjectId = new ObjectId(playlistId);
        PlayList playList = playListRepository.findById(playlistObjectId).orElseThrow(ChangeSetPersister.NotFoundException::new);
         playListRepository.delete(playList);

    }
    public PlayList createPlayList(String name,String username ) {
        PlayList playlist = new PlayList();
        playlist.setName(name);
        playlist.setOwner(username);
        return playListRepository.save(playlist);
    }
    public List<Map<String,String>> getPlayListByOwner(String owner){
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
    public List<Music> getMusicByPlayListId(String playlistId){
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
            AggregationResults<Music> results = mongoTemplate.aggregate(aggregation, "playlist", Music.class);
            List<Music> mappedResults = results.getMappedResults();
            if (mappedResults.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No music found for the given playlist");
            }
            return mappedResults;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found");
        }
    }
//    public Optional<PlayList> singleOwner (String owner) {
//        return playListRepository.findByOwner(owner);
//    }

//    public PlayList addMusic(ObjectId _id, List<music> musicId ){
//        mongoTemplate.update(PlayList.class)
//                .matching(Criteria.where("_id").is(_id))
//                .apply(new Update().push("musicId").value(musicId))
//                .first();
//    }
//    public Review createReview(String reviewBody, String number){
//        Review review = reviewRepository.insert(new Review(reviewBody));
//
//        mongoTemplate.update(music.class)
//                .matching(Criteria.where("number").is(number))
//                .apply(new Update().push("reviewIds").value(review))
//                .first();
//
//        return review;
//    }
}
