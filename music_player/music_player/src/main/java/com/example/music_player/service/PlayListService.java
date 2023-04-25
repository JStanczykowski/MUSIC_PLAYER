package com.example.music_player.service;


import com.example.music_player.model.PlayList;
import com.example.music_player.model.Review;
import com.example.music_player.model.music;
import com.example.music_player.repository.PlayListRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayListService {

    @Autowired
    private PlayListRepository playListRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
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
