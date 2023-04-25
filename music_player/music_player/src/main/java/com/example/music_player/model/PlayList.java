package com.example.music_player.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "playlist")
public class PlayList {
    @Id
    private ObjectId id;

    @NotBlank
    private String name;

    @NotBlank
    private String owner;

    private List<ObjectId> musicIds = new ArrayList<>();


    public PlayList() {
    }

    public PlayList(String name, String owner) {
        this.name = name;
        this.owner = owner;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<ObjectId> getMusicIds() {
        return musicIds;
    }

    public void setMusicIds(List<ObjectId> musicIds) {
        this.musicIds = musicIds;
    }
}
