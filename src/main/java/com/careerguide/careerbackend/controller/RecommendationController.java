package com.careerguide.careerbackend.controller;

import com.careerguide.careerbackend.dto.RecommendationRequest;
import com.careerguide.careerbackend.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<Map<String, Object>> evaluateRecommendations(
            @RequestBody RecommendationRequest request) {

        Map<String, Object> result =
                recommendationService.evaluateRecommendations(request);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", result.get("recommendations")
                )
        );
    }

    @GetMapping("/latest")
    public ResponseEntity<Map<String, Object>> getLatestRecommendations() {

        Map<String, Object> result =
                recommendationService.getLatestRecommendations();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", result);

        return ResponseEntity.ok(response);
    }
}