package com.example.backend.controller;

import com.example.backend.dto.UpdateProfileRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.GenericResponse;
import com.example.backend.response.UserProfileResponse;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GenericResponse("User not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GenericResponse("Invalid token"));
        }
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authHeader,
                                           @RequestParam(value = "username", required = false) String username,
                                           @RequestParam(value = "bio", required = false) String bio,
                                           @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            String email = JwtUtil.validateTokenAndGetEmail(authHeader.replace("Bearer ", ""));
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                if (username != null) user.setUsername(username);
                if (bio != null) user.setBio(bio);
                if (imageFile != null && !imageFile.isEmpty()) {
                    user.setImage(imageFile.getBytes());
                }

                userRepository.save(user);
                return ResponseEntity.ok(new GenericResponse("Profile updated successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GenericResponse("User not found"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GenericResponse("Failed to update profile"));
        }
    }

}
