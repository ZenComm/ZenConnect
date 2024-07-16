package com.example.ZenConnect.profile;

import java.util.List;

public class ProfileUpdateRequest {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String physicalAddress;
    private List<WorkExperienceRequest> workExperiences;
    private List<String> technicalSkills;
    private String image;
    // getters and setters


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhysicalAddress() {
        return physicalAddress;
    }

    public void setPhysicalAddress(String physicalAddress) {
        this.physicalAddress = physicalAddress;
    }

    public List<WorkExperienceRequest> getWorkExperiences() {
        return workExperiences;
    }

    public void setWorkExperiences(List<WorkExperienceRequest> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public List<String> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(List<String> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
