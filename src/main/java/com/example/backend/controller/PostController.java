package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        post.setLikes(0);
        return postRepository.save(post);
    }

    @PostMapping("/{id}/like")
    public Post likePost(@PathVariable String id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        return postRepository.save(post);
    }

    @PostMapping("/{id}/bookmark")
    public Post bookmarkPost(@PathVariable String id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setBookmarked(!post.isBookmarked());
        return postRepository.save(post);
    }
}
