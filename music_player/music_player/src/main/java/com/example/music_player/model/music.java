package com.example.music_player.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "music")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class music {
    @Id
    private ObjectId id;

    private String number;
    private String tytul;
    private String artysta;
    private String zdjecie;
    private String plik;
    private String objectId;
    @DocumentReference
    private List<Review> reviewIds;

    public music(ObjectId id, String number, String tytul, String artysta, String plik) {
        this.id = id;
        this.number = number;
        this.tytul = tytul;
        this.artysta = artysta;
        this.plik = plik;
        this.objectId = id.toString();
    }

    public music(String tytul, String artysta, String zdjecie, String plik) {
        this.tytul = tytul;
        this.artysta = artysta;
        this.zdjecie = zdjecie;
        this.plik = plik;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getTytul() {
        return tytul;
    }

    public void setTytul(String tytul) {
        this.tytul = tytul;
    }

    public String getArtysta() {
        return artysta;
    }

    public void setArtysta(String artysta) {
        this.artysta = artysta;
    }

    public String getZdjecie() {
        return zdjecie;
    }

    public void setZdjecie(String zdjecie) {
        this.zdjecie = zdjecie;
    }

    public String getPlik() {
        return plik;
    }

    public void setPlik(String plik) {
        this.plik = plik;
    }

    public List<Review> getReviewIds() {
        return reviewIds;
    }

    public void setReviewIds(List<Review> reviewIds) {
        this.reviewIds = reviewIds;
    }
}
