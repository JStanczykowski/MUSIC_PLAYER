package com.example.music_player.music.controller;

import com.example.music_player.model.Music;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test")
public class MusicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Should return all music")
    public void shouldReturnAllMusic() throws Exception {
        mockMvc.perform(get("/api/v1/music")
                        .with(user("moderator").password("12345678").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(6));
    }

    @Test
    @DisplayName("Should get single music")
    public void shouldGetSingleMusic() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/music/641c867da6352fc3ad837bc6"))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        try {
            Music music = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Music.class);
            assertThat(music).isNotNull();
            assertThat(music.getNumber()).isEqualTo("2");
        } catch (JsonProcessingException e) {
            fail("Failed to deserialize response", e);
        }
    }
}