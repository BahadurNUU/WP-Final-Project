package com.example.backend.response;

import java.util.Date;
import java.util.List;

public class UserProfileResponse {
    private String username;
    private String email;
    private String bio;
    private String image;
    private List<String> bookmarks;
    private Date joined;

    public UserProfileResponse(String username, String email, String bio, String image, List<String> bookmarks, Date joined) {
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
    public String getImage() { return image; }
    public List<String> getBookmarks() { return bookmarks; }
    public Date getJoined() { return joined; }
}
