package com.careerguide.careerbackend.controller;

import com.careerguide.careerbackend.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/profile")
    public ResponseEntity<Map<String, Object>> saveProfile(
            @RequestBody Map<String, Object> profileData) {

        Map<String, Object> savedProfile =
                studentService.saveProfile(profileData);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "data", savedProfile
                )
        );
    }
}