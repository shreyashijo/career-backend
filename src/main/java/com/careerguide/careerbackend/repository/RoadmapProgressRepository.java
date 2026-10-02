package com.careerguide.careerbackend.repository;

import com.careerguide.careerbackend.entity.RoadmapProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoadmapProgressRepository extends JpaRepository<RoadmapProgress, Long> {

    Optional<RoadmapProgress> findByUserIdAndCareerId(Long userId, String careerId);
}
