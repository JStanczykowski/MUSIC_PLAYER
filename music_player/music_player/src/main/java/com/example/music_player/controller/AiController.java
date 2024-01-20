package com.example.music_player.controller;

import com.example.music_player.ai.AIRequest;
import com.example.music_player.ai.AiMessageDto;
import com.example.music_player.ai.CompletionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/music/ai")
@CrossOrigin
public class AiController {


    @Value("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")
    private  String aiApiKey;
    final private HttpClient client = HttpClient.newHttpClient();
    private static final URI AI_URI = URI.create("https://api.openai.com/v1/chat/completions");
    private final ObjectMapper jsonMapper;


    @Autowired
    public AiController(ObjectMapper jsonMapper, @Value("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") String aiApiKey) {
        this.jsonMapper = jsonMapper;
        this.aiApiKey = aiApiKey;
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @GetMapping("/{artist}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional chat(@PathVariable String artist) throws Exception {
        return chatWithGpt(artist);
    }

    private Optional chatWithGpt(String message) throws Exception {
        AIRequest aiRequest = new AIRequest(
                "gpt-3.5-turbo",
                new AiMessageDto[]{new AiMessageDto("user", "napisz mi informacje o muzyku którego ksywka to "+message+" krótko")},
                0.7,
                100
        );
        String messageAI = aiRequest.toJson();
        var request = HttpRequest.newBuilder()
                .uri(AI_URI)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+ aiApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(messageAI))
                .build();
        var resposneBody =client.send(request, HttpResponse.BodyHandlers.ofString()).body();
        CompletionResponse completionResponse = jsonMapper.readValue(resposneBody, CompletionResponse.class);

        return completionResponse.choices().stream()
                .findFirst()
                .map(choice -> choice.message().content());
    }

}
