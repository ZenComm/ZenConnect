package com.example.ZenConnect.message;

import com.example.ZenConnect.user.UserDTO;

import java.time.LocalDateTime;

public class MessageDTO {
    private Long id;
    private UserDTO sender;
    private UserDTO recipient;
    private String content;
    private LocalDateTime timestamp;

    // Constructors, Getters, and Setters
    public MessageDTO() {}

    public MessageDTO(Long id, UserDTO sender, UserDTO recipient, String content, LocalDateTime timestamp) {
        this.id = id;
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }

    public UserDTO getRecipient() {
        return recipient;
    }

    public void setRecipient(UserDTO recipient) {
        this.recipient = recipient;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

