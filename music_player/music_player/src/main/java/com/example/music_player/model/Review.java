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
import java.util.stream.Collectors;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

        @Id
        private ObjectId id;

        private String owner;
        @DocumentReference
        private List<Review> parentId;
        private Date createAt;

        private String body;


        public Review(ObjectId id, String body, String owner, Date createAt, List<Review> parentId) {
                this.owner = owner;
                this.body = body;
                this.createAt = createAt;
                this.parentId = parentId;
                this.id = id;
        }

        @Override
        public String toString() {
                String parentIdString = parentId.stream()
                        .map(parent -> "Review(id=" + parent.getId() + ", owner=" + parent.getOwner() + ", parentId=" + parent.getParentId() + ", createAt=" + parent.getCreateAt() + ", body=" + parent.getBody() + ")")
                        .collect(Collectors.joining(", "));

                return "Review(id=" + id + ", owner=" + owner + ", parentId=[" + parentIdString + "], createAt=" + createAt + ", body=" + body + ")";
        }
        public void addParentId(Optional<Review> parentIdOptional) {
       parentIdOptional.ifPresent(parentId -> getParentId().add(parentId));

      }
}


