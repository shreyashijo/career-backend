package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.entity.AuthUser;
import com.careerguide.careerbackend.entity.PasswordResetToken;
import com.careerguide.careerbackend.repository.AuthUserRepository;
import com.careerguide.careerbackend.repository.PasswordResetTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    public AuthService(
            AuthUserRepository authUserRepository,
            PasswordEncoder passwordEncoder,
            PasswordResetTokenRepository passwordResetTokenRepository,
            EmailService emailService) {

        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
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

        // Send login notification email via EmailService
        try {
            emailService.sendLoginNotificationEmail(user.getEmail(), user.getFullName());
        } catch (Exception e) {
            System.err.println("Login notification email delivery failed: " + e.getMessage());
        }

        return Map.of(
                "userId", user.getAuthUserId(),
                "fullName", user.getFullName(),
                "email", user.getEmail()
        );
    }

    @Transactional
    public void processForgotPassword(String email) {
        if (email == null || email.trim().isEmpty()) {
            return;
        }

        String normalizedEmail = email.trim().toLowerCase();
        Optional<AuthUser> userOpt = authUserRepository.findByEmail(normalizedEmail);

        if (userOpt.isEmpty()) {
            return;
        }

        AuthUser user = userOpt.get();
        Long userId = user.getAuthUserId();

        // 1. Invalidate any existing unused reset tokens for this user
        List<PasswordResetToken> existingTokens = passwordResetTokenRepository.findByUserIdAndUsedFalse(userId);
        for (PasswordResetToken token : existingTokens) {
            token.setUsed(true);
        }
        if (!existingTokens.isEmpty()) {
            passwordResetTokenRepository.saveAll(existingTokens);
        }

        // 2. Generate cryptographically secure random reset token (32 bytes, URL-safe Base64 without padding)
        byte[] randomBytes = new byte[32];
        SECURE_RANDOM.nextBytes(randomBytes);
        String tokenStr = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(15);

        PasswordResetToken resetToken = new PasswordResetToken(userId, tokenStr, expiryDate);
        passwordResetTokenRepository.save(resetToken);

        // 3. Build frontend reset URL
        String resetLink = "http://localhost:5173/reset-password?token=" + tokenStr;

        // 4. Send email notification via EmailService
        try {
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink, 15);
        } catch (Exception e) {
            System.err.println("Password reset email delivery failed: " + e.getMessage());
        }
    }

    @Transactional
    public void processResetPassword(String tokenStr, String newPassword) {
        if (tokenStr == null || tokenStr.trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid or expired password reset token.");
        }

        if (newPassword == null || newPassword.trim().isEmpty() || newPassword.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long.");
        }

        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByToken(tokenStr.trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired password reset token."));

        if (resetToken.isUsed() || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid or expired password reset token.");
        }

        AuthUser user = authUserRepository
                .findById(resetToken.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired password reset token."));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        authUserRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }
}
