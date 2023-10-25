package com.example.music_player.ai;

import com.fasterxml.jackson.core.JsonProcessingException;
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


    @Value("${env.API_KEY}") private  String aiApiKey;
    private HttpClient client = HttpClient.newHttpClient();
    private static final URI AI_URI = URI.create("https://api.openai.com/v1/chat/completions");
    private final ObjectMapper jsonMapper;


    @Autowired
    public AiController(ObjectMapper jsonMapper, @Value("${env.API_KEY}") String aiApiKey) {
        this.jsonMapper = jsonMapper;
        this.aiApiKey = aiApiKey;
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional chat() throws Exception {
        return chatWithGpt("czym jest chat?");
    }

    private Optional chatWithGpt(String message) throws Exception {
        AIRequest aiRequest = new AIRequest(
                "gpt-3.5-turbo",
                new AiMessageDto[]{new AiMessageDto("user", "napisz mi informacje o polskim wykonacu reto krótko")},
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
//        String content = String.valueOf(completionResponse.choices().get(0));
        ObjectMapper objectMapper = new ObjectMapper();
        Optional<String> firstAnswer = completionResponse.choices().stream()
                .findFirst()
                .map(choice -> choice.message().content());

        return firstAnswer;
    }

//    private HttpRequest.BodyPublisher aiMessageAsPostBody(String message) throws JsonProcessingException{
//        var completion = AiRequest.defaultWith(message);
//        return HttpRequest.BodyPublishers.ofString(jsonMapper.writeValueAsString(completion));
//    }
}
