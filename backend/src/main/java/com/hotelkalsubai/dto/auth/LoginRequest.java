package com.hotelkalsubai.dto.auth;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private String userType; // "user" or "admin"

    // Constructors
    public LoginRequest() {}

    public LoginRequest(String email, String password, String userType) {
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
}