package com.example.music_player.controller;


import com.example.music_player.repository.ReviewRepository;
import com.example.music_player.service.MusicService;
import com.example.music_player.service.ReviewService;
import com.example.music_player.model.Review;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MusicService musicService;
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @PostMapping
    @CrossOrigin
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("number"),payload.get("owner")), HttpStatus.CREATED);

    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/{id}")
    @CrossOrigin
    public Map<String, String> listReview(@PathVariable ObjectId id) {
        List<Review> reviewList = musicService.singleMusicByID(id).get().getReviewIds();

        Map<String, String> reviewMap = new HashMap<>();
        for (Review review : reviewList) {
            reviewMap.put(review.getId().toString(), review.getBody());
        }

        return reviewMap;
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{id}")
    @CrossOrigin
    public void deleteSingleComment(@PathVariable ObjectId id){

        if (reviewService.singleReviewByID(id).isPresent()) {

            reviewService.deleteSingleReview(reviewService.singleReviewByID(id));
        }
    }

}
