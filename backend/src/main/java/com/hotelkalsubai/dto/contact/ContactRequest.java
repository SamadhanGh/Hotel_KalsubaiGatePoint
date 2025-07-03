package com.hotelkalsubai.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ContactRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phone;

    private String subject;

    @NotBlank
    private String message;

    // Constructors
    public ContactRequest() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}