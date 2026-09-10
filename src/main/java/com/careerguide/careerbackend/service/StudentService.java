package com.careerguide.careerbackend.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class StudentService {

    private Map<String, Object> latestProfile;

    public Map<String, Object> saveProfile(Map<String, Object> profileData) {
        latestProfile = profileData;
        return profileData;
    }

    public Map<String, Object> getLatestProfile() {
        return latestProfile;
    }
}