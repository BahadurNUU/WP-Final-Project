package com.example.backend.response;

import java.util.Base64;
import java.util.Date;
import java.util.List;

public class UserProfileResponse {
    private String username;
    private String email;
    private String bio;
    private byte[] image;
    private List<String> bookmarks;
    private Date joined;

    public UserProfileResponse(String username, String email, String bio, byte[] image, List<String> bookmarks, Date joined) {
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.image = image;
        this.bookmarks = bookmarks;
        this.joined = joined;
    }

    // Getters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getBio() { return bio; }
    public String getImage() {
        return image != null ? Base64.getEncoder().encodeToString(image) : null;
    }
    public List<String> getBookmarks() { return bookmarks; }
    public Date getJoined() { return joined; }
}
