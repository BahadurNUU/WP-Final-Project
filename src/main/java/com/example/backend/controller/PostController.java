package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userId") String userId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));


        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setLikes(0);
        post.setUserId(user.getId());
        post.setAuthor(user.getUsername());

        if (imageFile != null && !imageFile.isEmpty()) {
            post.setImage(imageFile.getBytes());
        }

        return ResponseEntity.ok(postRepository.save(post));
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
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getPostImage(@PathVariable String id) {
        Post post = postRepository.findById(id).orElse(null);
        if (post != null && post.getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // or IMAGE_PNG based on your image format
                    .body(post.getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
