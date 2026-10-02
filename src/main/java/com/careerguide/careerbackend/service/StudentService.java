package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.entity.Student;
import com.careerguide.careerbackend.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final ObjectMapper objectMapper;

    public StudentService(StudentRepository studentRepository, ObjectMapper objectMapper) {
        this.studentRepository = studentRepository;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> saveProfile(Map<String, Object> profileData) {
        return saveProfileForUser(null, null, profileData);
    }

    public Map<String, Object> getProfileForUser(Long authUserId, String userEmail) {
        if (authUserId == null && (userEmail == null || userEmail.isBlank())) {
            return null;
        }

        Optional<Student> studentOpt = Optional.empty();
        if (authUserId != null) {
            studentOpt = studentRepository.findByAuthUserId(authUserId);
        }

        if (studentOpt.isEmpty() && userEmail != null && !userEmail.isBlank()) {
            studentOpt = studentRepository.findByEmail(userEmail.trim().toLowerCase());
        }

        if (studentOpt.isEmpty()) {
            return null;
        }

        Student student = studentOpt.get();

        // Link authUserId if missing
        if (authUserId != null && student.getAuthUserId() == null) {
            student.setAuthUserId(authUserId);
            studentRepository.save(student);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("fullName", student.getFullName());
        map.put("email", student.getEmail());
        map.put("age", student.getAge());
        map.put("college", student.getCollege());
        map.put("course", student.getCourse());
        map.put("semester", student.getSemester());
        map.put("profilePayload", student.getProfilePayload());

        return map;
    }

    public Map<String, Object> saveProfileForUser(Long authUserId, String userEmail, Map<String, Object> profileData) {
        if (profileData == null) {
            profileData = new HashMap<>();
        }

        String targetEmail = userEmail != null && !userEmail.isBlank()
                ? userEmail.trim().toLowerCase()
                : asString(profileData.get("email"), null);

        Student student = null;

        if (authUserId != null) {
            student = studentRepository.findByAuthUserId(authUserId).orElse(null);
        }

        if (student == null && targetEmail != null && !targetEmail.isBlank()) {
            student = studentRepository.findByEmail(targetEmail).orElse(null);
        }

        if (student == null) {
            student = new Student();
        }

        if (authUserId != null) {
            student.setAuthUserId(authUserId);
        }

        String fullName = asString(profileData.get("fullName"), "");
        if (fullName == null || fullName.isBlank()) {
            fullName = "Student";
        }

        student.setFullName(fullName);
        student.setEmail(targetEmail);
        student.setAge(asInteger(profileData.get("age")));
        student.setCollege(asString(profileData.get("college"), null));
        student.setCourse(asString(profileData.get("course"), null));
        student.setSemester(asString(profileData.get("semester"), null));

        try {
            String jsonPayload = objectMapper.writeValueAsString(profileData);
            student.setProfilePayload(jsonPayload);
        } catch (Exception e) {
            // Ignore payload serialization failure if any
        }

        Student saved = studentRepository.save(student);

        Map<String, Object> result = new HashMap<>(profileData);
        result.put("studentId", saved.getStudentId());
        result.put("authUserId", saved.getAuthUserId());
        result.put("fullName", saved.getFullName());
        result.put("email", saved.getEmail());
        result.put("age", saved.getAge());
        result.put("college", saved.getCollege());
        result.put("course", saved.getCourse());
        result.put("semester", saved.getSemester());

        return result;
    }

    private String asString(Object value, String defaultValue) {
        if (value == null) {
            return defaultValue;
        }

        if (value instanceof String stringValue) {
            return stringValue;
        }

        return String.valueOf(value);
    }

    private Integer asInteger(Object value) {
        if (value == null) {
            return null;
        }

        if (value instanceof Number numberValue) {
            return numberValue.intValue();
        }

        if (value instanceof String stringValue) {
            String trimmed = stringValue.trim();

            if (trimmed.isEmpty()) {
                return null;
            }

            try {
                return Integer.valueOf(trimmed);
            } catch (NumberFormatException exception) {
                return null;
            }
        }

        return null;
    }
}