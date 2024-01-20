package com.example.music_player.music.service;

import com.example.music_player.model.Music;
import com.example.music_player.repository.MusicRepository;
import com.example.music_player.service.MusicService;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test")
public class MusicServiceTest {
    @Mock
    private MusicRepository musicRepository;

    @InjectMocks
    private MusicService musicService;

    @Test
    public void MusicServiceGetAllReturnMoreThanOneMusic(){
        ObjectId objectId = new ObjectId();
        Music music = new Music(objectId,"1","title","artist","picture","file","genre");
        Music music2 = new Music(objectId,"2","title2","artist2","picture2","file2","genre2");

        when(musicRepository.findAll()).thenReturn(Arrays.asList(music, music2));

        List<Music> musicList = musicService.getAllMusicPersonal();


        assertNotNull(musicList);
        assertEquals(Arrays.asList(music, music2), musicList);
        verify(this.musicRepository).findAll();
    }

    @Test
    public void MusicRepositoryMusicDeleteReturnMusicIsEmpty() {
        ObjectId objectId = new ObjectId();
        Music music = new Music(objectId, "1", "title", "artist", "picture", "file", "genre");

        musicRepository.save(music);

        when(musicRepository.findByNumber("1")).thenReturn(Optional.empty());


        assertEquals(musicService.singleMusic("1"), Optional.empty());
        verify(this.musicRepository).findByNumber("1");
    }
}
