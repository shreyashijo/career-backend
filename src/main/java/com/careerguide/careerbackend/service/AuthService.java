package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.entity.AuthUser;
import com.careerguide.careerbackend.repository.AuthUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthUserRepository authUserRepository,
            PasswordEncoder passwordEncoder) {

        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> register(
            String fullName,
            String email,
            String password) {

        if (fullName == null || fullName.trim().isEmpty()) {
            throw new IllegalArgumentException("Full name is required");
        }

        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        String normalizedEmail = email.trim().toLowerCase();

        if (authUserRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists"
            );
        }

        AuthUser user = new AuthUser();

        user.setFullName(fullName.trim());
        user.setEmail(normalizedEmail);

        // Never store the plain-text password.
        String hashedPassword = passwordEncoder.encode(password);
        user.setPasswordHash(hashedPassword);

        AuthUser savedUser = authUserRepository.save(user);

        return Map.of(
                "userId", savedUser.getAuthUserId(),
                "fullName", savedUser.getFullName(),
                "email", savedUser.getEmail()
        );
    }

    public Map<String, Object> login(
            String email,
            String password) {

        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        String normalizedEmail = email.trim().toLowerCase();

        AuthUser user = authUserRepository
                .findByEmail(normalizedEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password"
                        )
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        password,
                        user.getPasswordHash()
                );

        if (!passwordMatches) {
            throw new IllegalArgumentException(
                    "Invalid email or password"
            );
        }

        return Map.of(
                "userId", user.getAuthUserId(),
                "fullName", user.getFullName(),
                "email", user.getEmail()
        );
    }
}
