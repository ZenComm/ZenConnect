package com.example.ZenConnect.user;

import com.example.ZenConnect.profile.Profile;
import com.example.ZenConnect.profile.ProfileRepository;
import com.example.ZenConnect.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private ProfileService profileService;

    public User registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setRole(Role.valueOf(registerRequest.getRole()));
        user.setGroupName(registerRequest.getGroupName());

        Profile profile = new Profile();
        profile.setEmail(registerRequest.getEmail());
        user.setProfile(profile);

        userRepository.save(user);

        profileService.createProfile(user);

        return  user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllInterns() {
        return userRepository.findByRole("INTERN");
    }

    public List<User> getInternsByGroup(String groupName) {
        return userRepository.findInternsByGroup(groupName);
    }

    public User getUserById(String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }
}

