package com.careerguide.careerbackend.dto;

public class DashboardResponse {

    private String name;
    private String email;
    private String profileCompletionStatus;
    private int skillsCount;
    private int interestsCount;
    private String assessmentCompletionStatus;
    private String recommendedCareer;
    private int roadmapProgressPercentage;
    private int completedMilestoneCount;
    private int totalMilestoneCount;
    private boolean roadmapStarted;

    public DashboardResponse() {
    }

    public DashboardResponse(
            String name,
            String email,
            String profileCompletionStatus,
            int skillsCount,
            int interestsCount,
            String assessmentCompletionStatus,
            String recommendedCareer,
            int roadmapProgressPercentage,
            int completedMilestoneCount,
            int totalMilestoneCount) {
        this(name, email, profileCompletionStatus, skillsCount, interestsCount, assessmentCompletionStatus, recommendedCareer, roadmapProgressPercentage, completedMilestoneCount, totalMilestoneCount, false);
    }

    public DashboardResponse(
            String name,
            String email,
            String profileCompletionStatus,
            int skillsCount,
            int interestsCount,
            String assessmentCompletionStatus,
            String recommendedCareer,
            int roadmapProgressPercentage,
            int completedMilestoneCount,
            int totalMilestoneCount,
            boolean roadmapStarted) {

        this.name = name;
        this.email = email;
        this.profileCompletionStatus = profileCompletionStatus;
        this.skillsCount = skillsCount;
        this.interestsCount = interestsCount;
        this.assessmentCompletionStatus = assessmentCompletionStatus;
        this.recommendedCareer = recommendedCareer;
        this.roadmapProgressPercentage = roadmapProgressPercentage;
        this.completedMilestoneCount = completedMilestoneCount;
        this.totalMilestoneCount = totalMilestoneCount;
        this.roadmapStarted = roadmapStarted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileCompletionStatus() {
        return profileCompletionStatus;
    }

    public void setProfileCompletionStatus(String profileCompletionStatus) {
        this.profileCompletionStatus = profileCompletionStatus;
    }

    public int getSkillsCount() {
        return skillsCount;
    }

    public void setSkillsCount(int skillsCount) {
        this.skillsCount = skillsCount;
    }

    public int getInterestsCount() {
        return interestsCount;
    }

    public void setInterestsCount(int interestsCount) {
        this.interestsCount = interestsCount;
    }

    public String getAssessmentCompletionStatus() {
        return assessmentCompletionStatus;
    }

    public void setAssessmentCompletionStatus(String assessmentCompletionStatus) {
        this.assessmentCompletionStatus = assessmentCompletionStatus;
    }

    public String getRecommendedCareer() {
        return recommendedCareer;
    }

    public void setRecommendedCareer(String recommendedCareer) {
        this.recommendedCareer = recommendedCareer;
    }

    public int getRoadmapProgressPercentage() {
        return roadmapProgressPercentage;
    }

    public void setRoadmapProgressPercentage(int roadmapProgressPercentage) {
        this.roadmapProgressPercentage = roadmapProgressPercentage;
    }

    public int getCompletedMilestoneCount() {
        return completedMilestoneCount;
    }

    public void setCompletedMilestoneCount(int completedMilestoneCount) {
        this.completedMilestoneCount = completedMilestoneCount;
    }

    public int getTotalMilestoneCount() {
        return totalMilestoneCount;
    }

    public void setTotalMilestoneCount(int totalMilestoneCount) {
        this.totalMilestoneCount = totalMilestoneCount;
    }

    public boolean isRoadmapStarted() {
        return roadmapStarted;
    }

    public void setRoadmapStarted(boolean roadmapStarted) {
        this.roadmapStarted = roadmapStarted;
    }
}
