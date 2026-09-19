package com.careerguide.careerbackend.service;

import com.careerguide.careerbackend.entity.Student;
import com.careerguide.careerbackend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Map<String, Object> saveProfile(Map<String, Object> profileData) {

        if (profileData == null) {
            return Map.of();
        }

        Student student = new Student();

        student.setFullName(asString(profileData.get("fullName"), ""));
        student.setEmail(asString(profileData.get("email"), null));
        student.setAge(asInteger(profileData.get("age")));
        student.setCollege(asString(profileData.get("college"), null));
        student.setCourse(asString(profileData.get("course"), null));
        student.setSemester(asString(profileData.get("semester"), null));

        studentRepository.save(student);

        return profileData;
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

    public Map<String, Object> getLatestProfile() {
        return Map.of();
    }
}