package com.careerguide.careerbackend.controller;

import com.careerguide.careerbackend.service.RoadmapService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class RoadmapController {

    private static final String SESSION_USER_ID = "AUTH_USER_ID";

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProgress(
            @RequestParam("careerId") String careerId,
            HttpSession session) {

        Object userIdObj = session.getAttribute(SESSION_USER_ID);
        if (userIdObj == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", "Not authenticated"
                    ));
        }

        Long userId = ((Number) userIdObj).longValue();
        List<String> completedTasks = roadmapService.getCompletedTasks(userId, careerId);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "careerId", careerId,
                        "completedTasks", completedTasks
                )
        ));
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveProgress(
            @RequestBody Map<String, Object> body,
            HttpSession session) {

        Object userIdObj = session.getAttribute(SESSION_USER_ID);
        if (userIdObj == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", "Not authenticated"
                    ));
        }

        Long userId = ((Number) userIdObj).longValue();
        String careerId = (String) body.get("careerId");

        @SuppressWarnings("unchecked")
        List<String> completedTasks = (List<String>) body.get("completedTasks");

        try {
            Map<String, Object> result = roadmapService.saveCompletedTasks(userId, careerId, completedTasks);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Roadmap progress saved successfully",
                    "data", result
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "success", false,
                            "message", e.getMessage()
                    ));
        }
    }

    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startRoadmap(
            @RequestBody(required = false) Map<String, String> body,
            HttpSession session) {

        Object userIdObj = session.getAttribute(SESSION_USER_ID);
        if (userIdObj == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", "Not authenticated"
                    ));
        }

        Long userId = ((Number) userIdObj).longValue();
        String careerId = body != null ? body.get("careerId") : null;

        try {
            Map<String, Object> result = roadmapService.startRoadmap(userId, careerId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Roadmap started successfully",
                    "data", result
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "success", false,
                            "message", e.getMessage()
                    ));
        }
    }
}
