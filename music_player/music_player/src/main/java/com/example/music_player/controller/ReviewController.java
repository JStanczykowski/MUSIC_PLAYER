package com.example.music_player.controller;


import com.example.music_player.repository.ReviewRepository;
import com.example.music_player.service.ReviewService;
import com.example.music_player.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewRepository reviewRepository;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @PostMapping
    @CrossOrigin
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("number")), HttpStatus.CREATED);

    }
}
