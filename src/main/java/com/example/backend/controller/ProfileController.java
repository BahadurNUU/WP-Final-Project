package com.example.backend.controller;

import com.example.backend.dto.UpdateProfileRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.UserProfileResponse;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = JwtUtil.validateTokenAndGetEmail(token);

            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User u = user.get();
                return ResponseEntity.ok(new UserProfileResponse(
                        u.getUsername(),
                        u.getEmail(),
                        u.getBio(),
                        u.getImage(),
                        u.getBookmarks(),
                        u.getCreatedAt()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authHeader,
                                           @RequestBody UpdateProfileRequest request) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = JwtUtil.validateTokenAndGetEmail(token);

            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User u = user.get();
                if (request.getUsername() != null) u.setUsername(request.getUsername());
                if (request.getBio() != null) u.setBio(request.getBio());
                if (request.getImage() != null) {
                    byte[] imageBytes = Base64.getDecoder().decode(request.getImage());
                    u.setImage(imageBytes);
                }


                userRepository.save(u);
                return ResponseEntity.ok("Profile updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

}
