package com.example.backend.controller;

import com.example.backend.model.Comment;
import com.example.backend.model.User;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
private UserRepository userRepository;

    @GetMapping("/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable String postId) {
        return commentRepository.findByPostId(postId);
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {

        User user = userRepository.findById(comment.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Set the author's name
    comment.setAuthor(user.getUsername());

        return commentRepository.save(comment);
    }
}
