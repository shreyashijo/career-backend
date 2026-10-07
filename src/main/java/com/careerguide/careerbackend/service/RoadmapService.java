package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.entity.RoadmapProgress;
import com.careerguide.careerbackend.repository.RoadmapProgressRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RoadmapService {

    private final RoadmapProgressRepository roadmapProgressRepository;
    private final ObjectMapper objectMapper;

    public RoadmapService(RoadmapProgressRepository roadmapProgressRepository, ObjectMapper objectMapper) {
        this.roadmapProgressRepository = roadmapProgressRepository;
        this.objectMapper = objectMapper;
    }

    public List<String> getCompletedTasks(Long userId, String careerId) {
        if (userId == null || careerId == null) {
            return new ArrayList<>();
        }

        Optional<RoadmapProgress> progressOpt = roadmapProgressRepository.findByUserIdAndCareerId(userId, careerId);
        if (progressOpt.isEmpty() || progressOpt.get().getCompletedTasksJson() == null) {
            return new ArrayList<>();
        }

        try {
            return objectMapper.readValue(
                    progressOpt.get().getCompletedTasksJson(),
                    new TypeReference<List<String>>() {}
            );
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public Map<String, Object> saveCompletedTasks(Long userId, String careerId, List<String> completedTasks) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        if (careerId == null || careerId.trim().isEmpty()) {
            throw new IllegalArgumentException("Career ID is required");
        }

        List<String> tasks = completedTasks != null ? completedTasks : new ArrayList<>();

        String jsonString;
        try {
            jsonString = objectMapper.writeValueAsString(tasks);
        } catch (Exception e) {
            jsonString = "[]";
        }

        RoadmapProgress progress = roadmapProgressRepository
                .findByUserIdAndCareerId(userId, careerId)
                .orElseGet(() -> new RoadmapProgress(userId, careerId, "[]"));

        progress.setCompletedTasksJson(jsonString);
        RoadmapProgress saved = roadmapProgressRepository.save(progress);

        return Map.of(
                "careerId", saved.getCareerId(),
                "completedTasks", tasks,
                "updatedAt", saved.getUpdatedAt().toString()
        );
    }

    public Map<String, Object> startRoadmap(Long userId, String careerId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        if (careerId == null || careerId.trim().isEmpty()) {
            throw new IllegalArgumentException("Career ID is required");
        }

        String sanitizedCareerId = careerId.trim();

        Optional<RoadmapProgress> progressOpt = roadmapProgressRepository.findByUserIdAndCareerId(userId, sanitizedCareerId);
        RoadmapProgress progress;
        if (progressOpt.isPresent()) {
            progress = progressOpt.get();
        } else {
            progress = new RoadmapProgress(userId, sanitizedCareerId, "[]");
            progress = roadmapProgressRepository.save(progress);
        }

        return Map.of(
                "careerId", progress.getCareerId(),
                "roadmapStarted", true,
                "updatedAt", progress.getUpdatedAt() != null ? progress.getUpdatedAt().toString() : ""
        );
    }
}
