package com.example.music_player.repository;

import com.example.music_player.model.ERole;
import com.example.music_player.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}