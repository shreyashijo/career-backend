package com.careerguide.careerbackend.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private String careerTitle;

    private Integer matchPercentage;

    @Column(length = 1000)
    private String description;

    private String avgSalary;

    private String jobGrowth;

    private Instant generatedAt;

    public Recommendation() {
    }

    public Recommendation(
            String studentName,
            String careerTitle,
            Integer matchPercentage,
            String description,
            String avgSalary,
            String jobGrowth,
            Instant generatedAt) {

        this.studentName = studentName;
        this.careerTitle = careerTitle;
        this.matchPercentage = matchPercentage;
        this.description = description;
        this.avgSalary = avgSalary;
        this.jobGrowth = jobGrowth;
        this.generatedAt = generatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCareerTitle() {
        return careerTitle;
    }

    public void setCareerTitle(String careerTitle) {
        this.careerTitle = careerTitle;
    }

    public Integer getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Integer matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvgSalary() {
        return avgSalary;
    }

    public void setAvgSalary(String avgSalary) {
        this.avgSalary = avgSalary;
    }

    public String getJobGrowth() {
        return jobGrowth;
    }

    public void setJobGrowth(String jobGrowth) {
        this.jobGrowth = jobGrowth;
    }

    public Instant getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(Instant generatedAt) {
        this.generatedAt = generatedAt;
    }
}