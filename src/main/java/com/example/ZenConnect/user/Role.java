package com.example.ZenConnect.user;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    MANAGER,
    INTERN;

    @JsonValue
    public String getJsonValue() {
        return name();
    }
}
