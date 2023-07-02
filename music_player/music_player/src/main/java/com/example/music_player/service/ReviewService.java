package com.example.music_player.service;

import com.example.music_player.model.Review;
import com.example.music_player.model.Music;
import com.example.music_player.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private MusicService musicService;
    public Review createReview(String reviewBody, String number,String owner){
        Review review = reviewRepository.insert(new Review(reviewBody,owner));

        mongoTemplate.update(Music.class)
                .matching(Criteria.where("number").is(number))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }
    public Map<String,String> reviewList( ObjectId id){
        List<Review> reviewList = musicService.singleMusicByID(id).get().getReviewIds();

        Map<String, String> reviewMap = new HashMap<>();
        for (Review review : reviewList) {
            reviewMap.put(review.getId().toString(), review.getBody());
        }

        return reviewMap;
    }
    public Optional<Review> singleReviewByID(ObjectId id){
        return reviewRepository.findById(id);
    }
    public void deleteSingleReview(Optional<Review> review) {
        review.ifPresent(reviewRepository::delete);
    }
}
