package com.example.music_player.service;

import com.example.music_player.model.Review;
import com.example.music_player.model.music;
import com.example.music_player.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String number,String owner){
        Review review = reviewRepository.insert(new Review(reviewBody,owner));

        mongoTemplate.update(music.class)
                .matching(Criteria.where("number").is(number))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }

    public Optional<Review> singleReviewByID(ObjectId id){
        return reviewRepository.findById(id);
    }
    public void deleteSingleReview(Optional<Review> review) {
        review.ifPresent(reviewRepository::delete);
    }
}
