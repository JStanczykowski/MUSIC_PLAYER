package com.example.music_player.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String reply;
    private boolean active = true;

    public Message(String username, String title, String messageBody) {
        this.username = username;
        this.title = title;
        this.messageBody = messageBody;
    }


}
