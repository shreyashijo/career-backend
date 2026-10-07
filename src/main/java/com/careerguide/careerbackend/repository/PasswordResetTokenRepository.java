package com.careerguide.careerbackend.repository;

import com.careerguide.careerbackend.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    java.util.List<PasswordResetToken> findByUserIdAndUsedFalse(Long userId);
}
