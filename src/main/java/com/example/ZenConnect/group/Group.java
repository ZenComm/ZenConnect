//package com.example.ZenConnect.group;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import java.time.LocalDate;
//
//@Entity
//public class Group {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String groupId;
//    private String name;
//    private LocalDate dateCreated;
//
//    public Group() {
//    }
//
//    public Group(String name, LocalDate dateCreated) {
//        this.name = name;
//        this.dateCreated = dateCreated;
//        this.groupId = "GRP_" + System.nanoTime();
//    }
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getGroupId() {
//        return groupId;
//    }
//
//    public void setGroupId(String groupId) {
//        this.groupId = groupId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public LocalDate getDateCreated() {
//        return dateCreated;
//    }
//
//    public void setDateCreated(LocalDate dateCreated) {
//        this.dateCreated = dateCreated;
//    }
//}
