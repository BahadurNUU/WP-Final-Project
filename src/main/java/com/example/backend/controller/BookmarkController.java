package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Post>> getBookmarkedPosts(@PathVariable String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        List<String> bookmarkIds = user.getBookmarks();
        List<Post> bookmarkedPosts = postRepository.findAllById(bookmarkIds);

        return ResponseEntity.ok(bookmarkedPosts);
    }

    @PostMapping("/{userId}/{postId}")
    public ResponseEntity<User> toggleBookmark(@PathVariable String userId, @PathVariable String postId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Post> postOpt = postRepository.findById(postId);

        if (userOpt.isEmpty() || postOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        List<String> bookmarks = user.getBookmarks();

        if (bookmarks.contains(postId)) {
            bookmarks.remove(postId);
        } else {
            bookmarks.add(postId);
        }

        user.setBookmarks(bookmarks);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}
