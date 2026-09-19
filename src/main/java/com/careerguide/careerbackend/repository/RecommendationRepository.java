package com.careerguide.careerbackend.repository;

import com.careerguide.careerbackend.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendationRepository
        extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByStudentNameOrderByGeneratedAtDesc(
            String studentName);
}