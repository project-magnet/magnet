package com.example.magnet.member.entity;

import jakarta.persistence.Entity;

@Entity
public enum Role {
    ROLE_USER("ROLE_USER"),
    ROLE_MENTOR("ROLE_MENTOR"),
    ROLE_MENTEE("ROLE_MENTEE"),
    ROLE_ADMIN("ROLE_ADMIN");

    String role;

    Role(String role) {
        this.role = role;
    }

    public String value() {
        return role;
    }
}
