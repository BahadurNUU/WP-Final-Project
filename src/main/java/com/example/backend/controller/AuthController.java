package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.GenericResponse;
import com.example.backend.response.LoginResponse;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/test")
    public ResponseEntity<?> testMongoConnection() {
        User testUser = new User();
        testUser.setUsername("Mongo Test123");
        testUser.setEmail("mongoSecond@test.com");
        testUser.setPassword("123456");

        userRepository.save(testUser);
        return ResponseEntity.ok("MongoDB connection successful! User saved.");
    }


    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(request.getPassword())) {
            String token = JwtUtil.generateToken(user.get().getEmail());
            String username = user.get().getUsername();
            String userId = user.get().getId();
            LoginResponse response = new LoginResponse(token, userId, username);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GenericResponse("Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new GenericResponse("Email already in use"));
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setUsername(request.getUsername());

        userRepository.save(newUser);

        return ResponseEntity.ok(new GenericResponse("User registered successfully"));
    }
}