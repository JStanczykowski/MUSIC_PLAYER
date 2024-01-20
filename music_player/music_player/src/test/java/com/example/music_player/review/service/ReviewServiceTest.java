package com.example.music_player.review.service;

import com.example.music_player.model.Music;
import com.example.music_player.model.Review;
import com.example.music_player.repository.MusicRepository;
import com.example.music_player.repository.ReviewRepository;
import com.example.music_player.service.MusicService;
import com.example.music_player.service.ReviewService;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test")
public class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewService reviewService;


    @Test
    public void MusicServiceShouldGetSingleReviewById() {
        ObjectId objectId = new ObjectId();
        Review review = new Review(objectId, "test", "test", new Date(), null);

        reviewRepository.save(review);

        when(reviewRepository.findById(objectId)).thenReturn(Optional.of(review));


        assertEquals(reviewService.singleReviewByID(objectId), Optional.of(review));
        verify(this.reviewRepository).findById(objectId);
    }
}
