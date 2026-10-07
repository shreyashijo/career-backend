package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.dto.DashboardResponse;
import com.careerguide.careerbackend.entity.AuthUser;
import com.careerguide.careerbackend.entity.RoadmapProgress;
import com.careerguide.careerbackend.entity.Student;
import com.careerguide.careerbackend.repository.AuthUserRepository;
import com.careerguide.careerbackend.repository.RoadmapProgressRepository;
import com.careerguide.careerbackend.repository.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {

    private final AuthUserRepository authUserRepository;
    private final StudentRepository studentRepository;
    private final RoadmapProgressRepository roadmapProgressRepository;
    private final ObjectMapper objectMapper;

    public DashboardService(
            AuthUserRepository authUserRepository,
            StudentRepository studentRepository,
            RoadmapProgressRepository roadmapProgressRepository,
            ObjectMapper objectMapper) {

        this.authUserRepository = authUserRepository;
        this.studentRepository = studentRepository;
        this.roadmapProgressRepository = roadmapProgressRepository;
        this.objectMapper = objectMapper;
    }

    public DashboardResponse getDashboardForUser(Long authUserId) {
        if (authUserId == null) {
            throw new IllegalArgumentException("User ID is required");
        }

        AuthUser authUser = authUserRepository.findById(authUserId).orElse(null);
        String name = authUser != null ? authUser.getFullName() : "Student";
        String email = authUser != null ? authUser.getEmail() : "";

        Student student = studentRepository.findByAuthUserId(authUserId).orElse(null);
        if (student == null && authUser != null && authUser.getEmail() != null) {
            student = studentRepository.findByEmail(authUser.getEmail()).orElse(null);
        }

        String profileCompletionStatus = "INCOMPLETE";
        int skillsCount = 0;
        int interestsCount = 0;
        String assessmentCompletionStatus = "INCOMPLETE";
        String recommendedCareer = "Cybersecurity Analyst";
        String recommendedCareerSlug = "cybersecurity-analyst";

        if (student != null) {
            boolean hasName = student.getFullName() != null && !student.getFullName().isBlank();
            boolean hasAge = student.getAge() != null;
            boolean hasCollege = student.getCollege() != null && !student.getCollege().isBlank();
            boolean hasCourse = student.getCourse() != null && !student.getCourse().isBlank();
            boolean hasSemester = student.getSemester() != null && !student.getSemester().isBlank();

            if (hasName && hasAge && hasCollege && hasCourse && hasSemester) {
                profileCompletionStatus = "COMPLETE";
            }

            if (student.getProfilePayload() != null && !student.getProfilePayload().isBlank()) {
                try {
                    Map<String, Object> payload = objectMapper.readValue(
                            student.getProfilePayload(),
                            new TypeReference<Map<String, Object>>() {}
                    );

                    Object skillsObj = payload.get("skills");
                    if (skillsObj instanceof List<?> list) {
                        skillsCount = list.size();
                    }

                    Object interestsObj = payload.get("interests");
                    if (interestsObj instanceof List<?> list) {
                        interestsCount = list.size();
                    }

                    Object answersObj = payload.get("answers");
                    if (answersObj instanceof Map<?, ?> answersMap && !answersMap.isEmpty()) {
                        if (answersMap.size() >= 15) {
                            assessmentCompletionStatus = "COMPLETE";
                        } else {
                            assessmentCompletionStatus = "INCOMPLETE (" + answersMap.size() + "/15)";
                        }
                    }

                    Object recsObj = payload.get("recommendations");
                    if (recsObj instanceof List<?> recsList && !recsList.isEmpty()) {
                        Object firstRec = recsList.get(0);
                        if (firstRec instanceof Map<?, ?> recMap) {
                            Object titleObj = recMap.get("title");
                            Object idObj = recMap.get("id");
                            if (titleObj != null) {
                                recommendedCareer = String.valueOf(titleObj);
                            }
                            if (idObj != null) {
                                recommendedCareerSlug = String.valueOf(idObj);
                            }
                        }
                    }
                } catch (Exception e) {
                    // Ignore payload parse exception
                }
            }
        }

        // Calculate Roadmap Metrics
        boolean roadmapStarted = false;
        List<String> completedTasks = new ArrayList<>();

        List<RoadmapProgress> userProgressList = roadmapProgressRepository.findByUserIdOrderByUpdatedAtDesc(authUserId);
        if (!userProgressList.isEmpty()) {
            roadmapStarted = true;
            RoadmapProgress activeProgress = userProgressList.get(0);
            if (activeProgress.getCareerId() != null && !activeProgress.getCareerId().isBlank()) {
                recommendedCareerSlug = activeProgress.getCareerId();
                recommendedCareer = formatCareerTitle(recommendedCareerSlug);
            }

            if (activeProgress.getCompletedTasksJson() != null) {
                try {
                    completedTasks = objectMapper.readValue(
                            activeProgress.getCompletedTasksJson(),
                            new TypeReference<List<String>>() {}
                    );
                } catch (Exception e) {
                    completedTasks = new ArrayList<>();
                }
            }
        }

        int totalTasks = 11; // Standard total tasks per roadmap
        int completedTasksCount = completedTasks.size();
        int roadmapProgressPercentage = (roadmapStarted && totalTasks > 0)
                ? Math.min(100, Math.round((completedTasksCount * 100.0f) / totalTasks))
                : 0;

        // Calculate completed milestones (4 levels)
        int totalMilestoneCount = 4;
        int completedMilestoneCount = 0;

        if (roadmapStarted) {
            // Beginner: beg-1, beg-2, beg-3
            long begCompleted = completedTasks.stream().filter(t -> t.contains("-beg-")).count();
            if (begCompleted >= 3) completedMilestoneCount++;

            // Intermediate: int-1, int-2, int-3
            long intCompleted = completedTasks.stream().filter(t -> t.contains("-int-")).count();
            if (intCompleted >= 3) completedMilestoneCount++;

            // Advanced: adv-1, adv-2, adv-3
            long advCompleted = completedTasks.stream().filter(t -> t.contains("-adv-")).count();
            if (advCompleted >= 3) completedMilestoneCount++;

            // Master: mst-1, mst-2
            long mstCompleted = completedTasks.stream().filter(t -> t.contains("-mst-")).count();
            if (mstCompleted >= 2) completedMilestoneCount++;
        }

        return new DashboardResponse(
                name,
                email,
                profileCompletionStatus,
                skillsCount,
                interestsCount,
                assessmentCompletionStatus,
                recommendedCareer,
                roadmapProgressPercentage,
                completedMilestoneCount,
                totalMilestoneCount,
                roadmapStarted
        );
    }

    private String formatCareerTitle(String slug) {
        if (slug == null || slug.isBlank()) return "Career Roadmap";
        switch (slug.toLowerCase().trim()) {
            case "cybersecurity-analyst":
                return "Cybersecurity Analyst";
            case "data-scientist":
                return "Data Scientist";
            case "software-developer":
                return "Software Developer";
            default:
                String[] words = slug.split("-");
                StringBuilder sb = new StringBuilder();
                for (String w : words) {
                    if (!w.isBlank()) {
                        if (!sb.isEmpty()) sb.append(" ");
                        sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1));
                    }
                }
                return sb.toString();
        }
    }
}
