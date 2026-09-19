package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.dto.RecommendationRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

import com.careerguide.careerbackend.entity.Recommendation;
import com.careerguide.careerbackend.repository.RecommendationRepository;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final StudentService studentService;

    private Map<String, Object> latestRecommendations;

    public RecommendationService(
            RecommendationRepository recommendationRepository,
            StudentService studentService) {
        this.recommendationRepository = recommendationRepository;
        this.studentService = studentService;
    }

    public Map<String, Object> evaluateRecommendations(
            RecommendationRequest request) {

        Map<String, Object> profile = request.getProfile() != null
                ? request.getProfile()
                : new HashMap<>();

        if (!profile.isEmpty()) {
            studentService.saveProfile(profile);
        }

        List<String> skills = request.getSkills() != null
                ? request.getSkills()
                : new ArrayList<>();

        List<String> interests = request.getInterests() != null
                ? request.getInterests()
                : new ArrayList<>();

        Map<String, Object> answers = request.getAnswers() != null
                ? request.getAnswers()
                : new HashMap<>();

        List<Map<String, Object>> careers = createCareers();

        List<Map<String, Object>> recommendations = new ArrayList<>();

        for (Map<String, Object> career : careers) {

            double score = 0;

            List<String> relevantSkills =
                    (List<String>) career.get("relevantSkills");

            List<String> relevantInterests =
                    (List<String>) career.get("relevantInterests");

            List<Integer> relevantQuestions =
                    (List<Integer>) career.get("relevantQuestions");

            // Skills = 35%
            long matchedSkills = relevantSkills.stream()
                    .filter(skill -> containsIgnoreCase(skills, skill))
                    .count();

            score += ((double) matchedSkills /
                    relevantSkills.size()) * 35;

            // Interests = 35%
            long matchedInterests = relevantInterests.stream()
                    .filter(interest -> containsIgnoreCase(interests, interest))
                    .count();

            score += ((double) matchedInterests /
                    relevantInterests.size()) * 35;

            // Assessment answers = 30%
            long matchedAnswers = relevantQuestions.stream()
                    .filter(questionNumber ->
                            isYes(answers.get(String.valueOf(questionNumber))))
                    .count();

            score += ((double) matchedAnswers /
                    relevantQuestions.size()) * 30;

            int benchmark =
                    (Integer) career.get("matchBenchmark");

            int matchPercentage;

            if (skills.isEmpty()
                    && interests.isEmpty()
                    && answers.isEmpty()) {

                matchPercentage = benchmark;

            } else {

                double dynamicScore = score;

                matchPercentage = (int) Math.round(
                        (benchmark * 0.30)
                                + (dynamicScore * 0.70)
                );

                matchPercentage =
                        Math.max(55, Math.min(98, matchPercentage));
            }

            career.put("matchPercentage", matchPercentage);

            recommendations.add(career);
        }

        recommendations.sort((a, b) ->
                Integer.compare(
                        (Integer) b.get("matchPercentage"),
                        (Integer) a.get("matchPercentage")
                ));

        List<Map<String, Object>> topThree =
                recommendations.subList(
                        0,
                        Math.min(3, recommendations.size())
                );

        Map<String, Object> result = new HashMap<>();

        result.put("profile", request.getProfile());
        result.put("skills", skills);
        result.put("interests", interests);
        result.put("answers", answers);
        result.put("recommendations", topThree);
        result.put("generatedAt", Instant.now().toString());

        latestRecommendations = result;

        return result;
    }

    public Map<String, Object> getLatestRecommendations() {
        return latestRecommendations;
    }

    private boolean containsIgnoreCase(
            List<String> list,
            String value) {

        return list.stream()
                .anyMatch(item ->
                        item.equalsIgnoreCase(value));
    }

    private boolean isYes(Object answer) {

        return answer != null
                && answer.toString().equalsIgnoreCase("yes");
    }

    private List<Map<String, Object>> createCareers() {

        List<Map<String, Object>> careers = new ArrayList<>();

        careers.add(createCareer(
                "1",
                "Cybersecurity Analyst",
                "High Demand",
                92,
                Arrays.asList(
                        "Networking",
                        "Linux",
                        "Ethical Hacking",
                        "Security Fundamentals"
                ),
                Arrays.asList(
                        "Cybersecurity",
                        "Problem Solving",
                        "C Programming"
                ),
                Arrays.asList(
                        "Cybersecurity",
                        "Cloud Computing"
                ),
                Arrays.asList(7, 8, 2, 10),
                "Protect organizations from cyber threats and security attacks.",
                "$75,000 - $120,000",
                "32%"
        ));

        careers.add(createCareer(
                "2",
                "Software Developer",
                "Top Choice",
                87,
                Arrays.asList(
                        "Java",
                        "Data Structures",
                        "OOP",
                        "System Design"
                ),
                Arrays.asList(
                        "Java",
                        "Problem Solving",
                        "C Programming",
                        "Teamwork"
                ),
                Arrays.asList(
                        "Software Development",
                        "Web Development"
                ),
                Arrays.asList(1, 2, 3, 4, 13),
                "Design, build and maintain software applications.",
                "$70,000 - $125,000",
                "25%"
        ));

        careers.add(createCareer(
                "3",
                "Data Scientist",
                "Growing Field",
                78,
                Arrays.asList(
                        "Python",
                        "Statistics",
                        "SQL",
                        "Machine Learning"
                ),
                Arrays.asList(
                        "Python",
                        "Data Analysis",
                        "Problem Solving"
                ),
                Arrays.asList(
                        "Data Science",
                        "AI & ML"
                ),
                Arrays.asList(5, 6, 9, 15),
                "Analyze data and build predictive models.",
                "$80,000 - $140,000",
                "36%"
        ));

        careers.add(createCareer(
                "4",
                "Cloud Solutions Architect",
                "Enterprise Leader",
                74,
                Arrays.asList(
                        "AWS",
                        "Azure",
                        "Docker",
                        "Kubernetes",
                        "Linux",
                        "Microservices"
                ),
                Arrays.asList(
                        "Cybersecurity",
                        "Problem Solving",
                        "Java"
                ),
                Arrays.asList(
                        "Cloud Computing",
                        "Software Development"
                ),
                Arrays.asList(4, 7, 10, 14),
                "Design scalable and secure cloud infrastructure.",
                "$90,000 - $150,000",
                "28%"
        ));

        careers.add(createCareer(
                "5",
                "AI / Machine Learning Engineer",
                "Cutting-Edge",
                72,
                Arrays.asList(
                        "PyTorch",
                        "TensorFlow",
                        "NLP",
                        "Computer Vision"
                ),
                Arrays.asList(
                        "Python",
                        "Problem Solving",
                        "Data Analysis"
                ),
                Arrays.asList(
                        "AI & ML",
                        "Data Science"
                ),
                Arrays.asList(1, 2, 9, 10, 15),
                "Build intelligent systems using machine learning and AI.",
                "$85,000 - $145,000",
                "40%"
        ));

        careers.add(createCareer(
                "6",
                "UI/UX Designer",
                "Creative Tech",
                70,
                Arrays.asList(
                        "Figma",
                        "User Research",
                        "Design Systems",
                        "Prototyping"
                ),
                Arrays.asList(
                        "Web Development",
                        "Communication",
                        "Teamwork"
                ),
                Arrays.asList(
                        "UI/UX Design",
                        "Web Development"
                ),
                Arrays.asList(11, 12, 13),
                "Create user-friendly and engaging digital experiences.",
                "$60,000 - $110,000",
                "22%"
        ));

        return careers;
    }

    private Map<String, Object> createCareer(
            String id,
            String title,
            String badge,
            int benchmark,
            List<String> skills,
            List<String> relevantSkills,
            List<String> relevantInterests,
            List<Integer> relevantQuestions,
            String description,
            String avgSalary,
            String jobGrowth) {

        Map<String, Object> career = new HashMap<>();

        career.put("id", id);
        career.put("title", title);
        career.put("badge", badge);
        career.put("matchBenchmark", benchmark);
        career.put("skills", skills);
        career.put("relevantSkills", relevantSkills);
        career.put("relevantInterests", relevantInterests);
        career.put("relevantQuestions", relevantQuestions);
        career.put("description", description);
        career.put("avgSalary", avgSalary);
        career.put("jobGrowth", jobGrowth);

        return career;
    }
}
