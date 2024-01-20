package com.example.music_player.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Document(collection = "Message")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class  Message{
    @Id
    private ObjectId id;
    private String username;
    private String title;
    private String messageBody;
    private Date createAt;
    @DocumentReference
    private List<Message> reply;

    private boolean active = true;

    public Message(String username, String title, String messageBody,Date createAt) {
        this.username = username;
        this.title = title;
        this.messageBody = messageBody;
        this.createAt = createAt;
    }
    public Message(ObjectId id,String username, String title, String messageBody,Date createAt) {
        this.username = username;
        this.title = title;
        this.messageBody = messageBody;
        this.id = id;
        this.createAt = createAt;
    }

    public Message(ObjectId id,String username, String title, String messageBody, boolean active) {
        this.id = id;
        this.username = username;
        this.title = title;
        this.messageBody = messageBody;
        this.active = active;
    }
    public void addReply(List<Message> replyId) {
         getReply().addAll(replyId);
    }
}
