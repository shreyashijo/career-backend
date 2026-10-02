package com.careerguide.careerbackend.controller;

import com.careerguide.careerbackend.service.StudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class StudentController {

    private static final String SESSION_USER_ID = "AUTH_USER_ID";
    private static final String SESSION_USER = "AUTH_USER";

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(HttpSession session) {
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
        String userEmail = extractEmail(session);

        Map<String, Object> profile = studentService.getProfileForUser(userId, userEmail);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", profile);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/profile")
    public ResponseEntity<Map<String, Object>> saveProfile(
            @RequestBody Map<String, Object> profileData,
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
        String userEmail = extractEmail(session);

        Map<String, Object> savedProfile = studentService.saveProfileForUser(userId, userEmail, profileData);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", savedProfile
                )
        );
    }

    @SuppressWarnings("unchecked")
    private String extractEmail(HttpSession session) {
        Object userObj = session.getAttribute(SESSION_USER);
        if (userObj instanceof Map<?, ?> userMap) {
            Object emailObj = userMap.get("email");
            if (emailObj instanceof String emailStr) {
                return emailStr;
            }
        }
        return null;
    }
}