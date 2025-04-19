package com.example.backend.dto;

public class UpdateProfileRequest {
    private String username;
    private String bio;
    private String image;

    // Getters & Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
