package com.example.music_player.service;

import com.example.music_player.model.Review;
import com.example.music_player.model.music;
import com.example.music_player.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String number){
        Review review = reviewRepository.insert(new Review(reviewBody));

        mongoTemplate.update(music.class)
                .matching(Criteria.where("number").is(number))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }
}
