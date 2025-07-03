package com.hotelkalsubai.dto.auth;

import jakarta.validation.constraints.NotBlank;

public class SocialLoginRequest {
    @NotBlank
    private String token; // Google/Facebook token

    @NotBlank
    private String provider; // "google" or "facebook"

    private String userType; // "user" or "admin"

    // Constructors
    public SocialLoginRequest() {}

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
}