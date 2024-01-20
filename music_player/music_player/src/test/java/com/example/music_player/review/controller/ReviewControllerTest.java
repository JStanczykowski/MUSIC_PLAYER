package com.example.music_player.review.controller;

import com.example.music_player.controller.ReviewController;
import com.example.music_player.model.Review;
import com.example.music_player.repository.ReviewRepository;
import com.example.music_player.service.ReviewService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test")
class ReviewControllerTest {

    @Mock
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewController reviewController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles = "USER")
    void testDeleteSingleComment() throws Exception {
        ObjectId objectId = new ObjectId();
        Review review = new Review(objectId, "test", "test", new Date(), Collections.emptyList() );

        when(reviewRepository.findById(objectId)).thenReturn(Optional.of(review));

        ResultActions resultActions = mockMvc.perform(delete("/api/v1/reviews/{id}", objectId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    void testDeleteSingleCommentNotFound() throws Exception {
        // Given
        ObjectId reviewId = new ObjectId();
        when(reviewService.singleReviewByID(reviewId)).thenReturn(Optional.empty());

        // When
        mockMvc.perform(delete("/api/v1/reviews/{id}", reviewId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Then
        verify(reviewService, never()).deleteSingleReview(any());
    }
}