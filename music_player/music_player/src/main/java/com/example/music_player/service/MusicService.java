package com.example.music_player.service;

import com.example.music_player.model.Music;
import com.example.music_player.repository.MusicRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MusicService {


    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    public List<Music> findAllMusic() {return musicRepository.findAll();}

    public Map<String, List<Music>> fidArtis() {
        List<Music> musicList = getAllMusicPersonal();
        Map<String, List<Music>> listMap = new HashMap<>();

        for (Music music : musicList) {
            String artist = music.getArtysta();
            if (!listMap.containsKey(artist)) {
                listMap.put(artist, new ArrayList<>());
            }
            listMap.get(artist).add(music);
        }

        return listMap;
    }
    public void addMusic(String artist, String file, String picture, String title, String genre){
        List<Music> musicList= findAllMusic();
        int max = 0;
        for (Music music: musicList
             ) {
           if(Integer.parseInt(music.getNumber())>max) max = Integer.parseInt(music.getNumber());

        }
        int number = max+1;

        Music music = new Music(String.valueOf(number),title,artist,picture,file,genre);
        musicRepository.save(music);
    }
    public List<Music> getAllMusicPersonal(){
        List<Music> musicList = findAllMusic();
        return musicList.stream()
                .map(m -> new Music(m.getId(), m.getNumber(), m.getTytul(), m.getArtysta(), m.getPlik(),m.getZdjecie(),m.getGenre()))
                .collect(Collectors.toList());
    }
    public List<Music> getMusicByGenre(List<String> genreList) {
        Set<Music> musicList = new HashSet<>();
        for (String genre : genreList) {
            List<Music> musicsByGenre = musicRepository.findByGenre(genre);
            musicList.addAll(musicsByGenre);
        }
        return musicList.stream()
                .map(m -> new Music(m.getId(), m.getNumber(), m.getTytul(), m.getArtysta(), m.getPlik(), m.getZdjecie(), m.getGenre()))
                .collect(Collectors.toList());
    }

    public Optional<Music> singleMusic(java.lang.String number){
        return musicRepository.findByNumber(number);
    }
    public Optional<Music> singleMusicByID(ObjectId id){
        return musicRepository.findById(id);
    }
    public void deleteSingleMusic(Optional<Music> music) {
        music.ifPresent(musicRepository::delete);
    }

}
