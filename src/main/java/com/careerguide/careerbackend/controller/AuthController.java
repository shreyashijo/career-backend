package com.careerguide.careerbackend.controller;

import com.careerguide.careerbackend.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = {"http://localhost:5173", "http://127.0.0.1:5173"},
        allowCredentials = "true"
)
public class AuthController {

    private static final String SESSION_USER_ID = "AUTH_USER_ID";
    private static final String SESSION_USER = "AUTH_USER";

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @RequestBody Map<String, String> request) {

        try {
            Map<String, Object> user = authService.register(
                    request.get("fullName"),
                    request.get("email"),
                    request.get("password")
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of(
                            "success", true,
                            "message", "Registration successful",
                            "data", user
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

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> request,
            HttpSession session) {

        try {
            Map<String, Object> user = authService.login(
                    request.get("email"),
                    request.get("password")
            );

            session.setAttribute(
                    SESSION_USER_ID,
                    user.get("userId")
            );

            session.setAttribute(
                    SESSION_USER,
                    user
            );

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Login successful",
                            "data", user
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", e.getMessage()
                    ));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(
            HttpSession session) {

        Object user = session.getAttribute(SESSION_USER);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "message", "Not authenticated"
                    ));
        }

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", user
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(
            HttpSession session) {

        session.invalidate();

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Logout successful"
                )
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, Object>> forgotPassword(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        authService.processForgotPassword(email);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "If an account with that email exists, a password reset link has been sent."
                )
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(
            @RequestBody Map<String, String> request) {

        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");

            authService.processResetPassword(token, newPassword);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Password has been reset successfully."
                    )
            );
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