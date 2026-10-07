package com.careerguide.careerbackend.controller;

import com.careerguide.careerbackend.dto.DashboardResponse;
import com.careerguide.careerbackend.service.DashboardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class DashboardController {

    private static final String SESSION_USER_ID = "AUTH_USER_ID";

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboard(HttpSession session) {
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
        DashboardResponse dashboardData = dashboardService.getDashboardForUser(userId);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", dashboardData
                )
        );
    }
}
