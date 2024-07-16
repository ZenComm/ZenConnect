package com.example.ZenConnect.profile;

import com.google.cloud.Date;

public class WorkExperienceRequest {
    private String company;
    private Date dateStarted;
    private Date dateEnded;

    // getters and setters

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Date getDateStarted() {
        return dateStarted;
    }

    public void setDateStarted(Date dateStarted) {
        this.dateStarted = dateStarted;
    }

    public Date getDateEnded() {
        return dateEnded;
    }

    public void setDateEnded(Date dateEnded) {
        this.dateEnded = dateEnded;
    }
}
