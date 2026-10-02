package com.careerguide.careerbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "roadmap_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "career_id"})
})
public class RoadmapProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "career_id", nullable = false, length = 100)
    private String careerId;

    @Column(name = "completed_tasks_json", columnDefinition = "TEXT")
    private String completedTasksJson;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public RoadmapProgress() {
    }

    public RoadmapProgress(Long userId, String careerId, String completedTasksJson) {
        this.userId = userId;
        this.careerId = careerId;
        this.completedTasksJson = completedTasksJson;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCareerId() {
        return careerId;
    }

    public void setCareerId(String careerId) {
        this.careerId = careerId;
    }

    public String getCompletedTasksJson() {
        return completedTasksJson;
    }

    public void setCompletedTasksJson(String completedTasksJson) {
        this.completedTasksJson = completedTasksJson;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
