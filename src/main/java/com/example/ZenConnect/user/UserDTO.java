package com.example.ZenConnect.user;

public class UserDTO {
    private String id;
    private String fullName;

    // Constructors, Getters, and Setters
    public UserDTO() {}

    public UserDTO(String id, String fullName) {
        this.id = id;
        this.fullName = fullName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}

