package com.example.music_player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class MusicPlayerApplication {


	public static void main(String[] args) {
		SpringApplication.run(MusicPlayerApplication.class, args);
	}



}
