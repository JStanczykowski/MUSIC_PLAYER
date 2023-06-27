package com.example.music_player.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "playlist")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayList {
    @Id
    private ObjectId id;

    @NotBlank
    private String name;

    @NotBlank
    private String owner;

    private List<ObjectId> musicIds = new ArrayList<>();




}
