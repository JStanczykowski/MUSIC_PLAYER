package com.example.music_player.ai;

public record AIRequest(String model, AiMessageDto[] messages, double temperature, int max_tokens) {
    public String toJson() {
        return String.format("{\"model\":\"%s\",\"messages\":[{\"role\":\"%s\",\"content\":\"%s\"}],\"temperature\":%s,\"max_tokens\":%s}",
                model, messages[0].role(), messages[0].content(), temperature, max_tokens);
    }
}
