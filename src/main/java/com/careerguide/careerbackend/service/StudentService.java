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

        Student student = new Student();

        student.setFullName((String) profileData.get("fullName"));
        student.setEmail((String) profileData.get("email"));
        student.setAge((Integer) profileData.get("age"));
        student.setCollege((String) profileData.get("college"));
        student.setCourse((String) profileData.get("course"));
        student.setSemester((String) profileData.get("semester"));

        studentRepository.save(student);

        return profileData;
    }

    public Map<String, Object> getLatestProfile() {
        return Map.of();
    }
}