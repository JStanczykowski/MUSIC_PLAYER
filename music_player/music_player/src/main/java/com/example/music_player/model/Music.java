package com.example.music_player.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "music")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Music {
    @Id
    private ObjectId id;

    private String number;
    private String tytul;
    private String artysta;
    private String zdjecie;
    private String plik;
    private String objectId;
    private String genre;
    @DocumentReference
    private List<Review> reviewIds;

    public Music(String number, String tytul, String artysta, String zdjecie, String plik, String genre) {
        this.number = number;
        this.tytul = tytul;
        this.artysta = artysta;
        this.zdjecie = zdjecie;
        this.plik = plik;
        this.genre = genre;
    }

    public Music(ObjectId id, java.lang.String number, java.lang.String tytul, java.lang.String artysta, java.lang.String plik, java.lang.String zdjecie, String genre) {
        this.id = id;
        this.number = number;
        this.tytul = tytul;
        this.artysta = artysta;
        this.plik = plik;
        this.objectId = id.toString();
        this.zdjecie = zdjecie;
        this.genre = genre;
    }

}
