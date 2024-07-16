package com.example.ZenConnect.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/profiles/{userId}")
    public Profile getUserProfile(@PathVariable String userId) {
        return profileService.getProfileByUserId(userId);
    }

//    @PutMapping("/profiles/{userId}")
//    public Profile updateProfile(@PathVariable String userId, @RequestBody ProfileUpdateRequest profileUpdateRequest) {
//        return profileService.updateProfile(profileUpdateRequest, userId);
//    }

    @PutMapping("/profiles/{userId}")
    public Profile updateProfile(@PathVariable String userId, @RequestBody Profile profile) {
        return profileService.updateProfile(userId, profile);
    }
}