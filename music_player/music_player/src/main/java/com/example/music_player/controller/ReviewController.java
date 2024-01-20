package com.example.music_player.controller;

import com.example.music_player.service.ReviewService;
import com.example.music_player.model.Review;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @PostMapping
    @CrossOrigin
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload){

        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("number"),payload.get("owner"),payload.get("parentId")), HttpStatus.CREATED);

    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Map<String, Object>>> getReview(@PathVariable ObjectId id){


        List<Review> reviewList = reviewService.reviewList(id);
        List<Map<String, Object>> reviewInfoList = new ArrayList<>();

        for (Review review : reviewList) {
            Map<String, Object> reviewInfo = new HashMap<>();
            reviewInfo.put("id", review.getId().toHexString());
            reviewInfo.put("owner", review.getOwner());
            reviewInfo.put("parentId", convertParentId(review.getParentId()));

            reviewInfo.put("createAt", review.getCreateAt());
            reviewInfo.put("body", review.getBody());

            reviewInfoList.add(reviewInfo);
        }

        return new ResponseEntity<>(reviewInfoList, HttpStatus.OK);
    }

    private List<Map<String, Object>> convertParentId(List<Review> parentIdList) {
        List<Map<String, Object>> convertedParentIdList = new ArrayList<>();
        if (parentIdList != null) {
            for (Review parentId : parentIdList) {
                Map<String, Object> parentIdMap = new HashMap<>();
                parentIdMap.put("id", parentId.getId().toHexString());
                parentIdMap.put("owner", parentId.getOwner());
                parentIdMap.put("parentId", parentId.getParentId());
                parentIdMap.put("createAt", parentId.getCreateAt());
                parentIdMap.put("body", parentId.getBody());

                convertedParentIdList.add(parentIdMap);
            }
        }
        return convertedParentIdList;
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @DeleteMapping("/{id}")
    @CrossOrigin
    public void deleteSingleComment(@PathVariable ObjectId id) {

        if (reviewService.singleReviewByID(id).isPresent()) {
            reviewService.deleteSingleReview(reviewService.singleReviewByID(id));
        }
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @PutMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Map<String, String> payload) {

            Review updatedReview = reviewService.updateReview(payload.get("text"), id);
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);

    }
}
