package com.example.music_player.service;

import com.example.music_player.model.Review;
import com.example.music_player.model.Music;
import com.example.music_player.repository.ReviewRepository;
import com.example.music_player.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    private final MongoTemplate mongoTemplate;

    private final MusicService musicService;

    public ReviewService(ReviewRepository reviewRepository, MongoTemplate mongoTemplate, MusicService musicService) {
        this.reviewRepository = reviewRepository;
        this.mongoTemplate = mongoTemplate;
        this.musicService = musicService;
    }

    public Review createReview(String reviewBody, String number, String owner, String parentId) {
        Date currentDate = new Date();

        List<Review> reviews = new ArrayList<>();
        ObjectId objectId = new ObjectId();
        Review review = new Review(objectId,reviewBody, owner, currentDate, reviews);
        reviewRepository.insert(review);
        if (parentId != null && !parentId.isEmpty()) {
            ObjectId parentObjectId = new ObjectId(parentId);
            Optional<Review> parentReview = reviewRepository.findById(parentObjectId);
            if (parentReview.isPresent()) {

                parentReview.get().addParentId(Optional.of(review));
                System.out.println(parentReview);
                reviewRepository.save(parentReview.get());
                return parentReview.get();
            }
        }


        Query query = new Query(Criteria.where("number").is(number));
        Update update = new Update().push("reviewIds", review);
        mongoTemplate.updateFirst(query, update, Music.class);

        return review;
    }






     public List<Review> reviewList(ObjectId id) {
        Optional<Music> optionalReview = musicService.singleMusicByID(id);
        List<Review> reviewList = new ArrayList<>();
        optionalReview.ifPresent(getReviewIds->reviewList.addAll(optionalReview.get().getReviewIds()));
         System.out.println(reviewList);
        List<Review> reviewDTOlist = reviewList.stream()
                .map(m -> new Review(m.getId(), m.getBody(), m.getOwner(), m.getCreateAt(), m.getParentId()))
                .collect(Collectors.toList());
        return reviewDTOlist;
    }


    public Optional<Review> singleReviewByID(ObjectId id){

        return reviewRepository.findById(id);
    }
    public void deleteSingleReview(Optional<Review> review) {
        review.ifPresent(reviewRepository::delete);
    }
    public Review updateReview(String text, String id) {

        if (!ObjectId.isValid(id)) {
            throw new IllegalArgumentException("Nieprawidłowy identyfikator recenzji");
        }

        ObjectId reviewId = new ObjectId(id);

        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        if (optionalReview.isEmpty()) {
            throw new NoSuchElementException("Recenzja o podanym identyfikatorze nie istnieje");
        }

        Review reviewToUpdate = optionalReview.get();
        reviewToUpdate.setBody(text);

        reviewRepository.save(reviewToUpdate);

        return reviewToUpdate;
    }
}
