package com.example.ZenConnect.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByUsername(loginDTO.getUsername());
        User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));
        if (user != null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            // Generate JWT token
            return JwtUtil.generateToken(user);
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}

