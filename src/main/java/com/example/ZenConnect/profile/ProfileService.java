package com.example.ZenConnect.profile;


import com.example.ZenConnect.user.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ZenConnect.user.User;

import java.util.List;
import java.util.Objects;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class ProfileService {
    private static final Logger LOG = LogManager.getLogger(ProfileService.class);
    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public void createProfile(User user) {
        Profile profile = new Profile();
        profile.setUser(user);
        profileRepository.save(profile);
    }

    public Profile getProfileByUserId(String userId) {
        Profile profile = profileRepository.findByUser_Id(userId);
        // Return an empty profile if it doesn't exist
        return Objects.requireNonNullElseGet(profile, Profile::new);
    }

//    public Profile updateProfile(ProfileUpdateRequest profileUpdateRequest, String userId) {
//        Profile profile = profileRepository.findByUser_Id(userId);
//        if (profile == null) {
//            throw new RuntimeException("Profile not found");
//        }
//
//        profile.setFullName(profileUpdateRequest.getFullName());
//        profile.setEmail(profileUpdateRequest.getEmail());
//        profile.setPhoneNumber(profileUpdateRequest.getPhoneNumber());
//        profile.setPhysicalAddress(profileUpdateRequest.getPhysicalAddress());
//
//        List<WorkExperience> workExperiences = new ArrayList<>();
//        for (WorkExperienceRequest workExperienceRequest : profileUpdateRequest.getWorkExperiences()) {
//            WorkExperience workExperience = new WorkExperience();
//            workExperience.setCompany(workExperienceRequest.getCompany());
//            workExperience.setDateStarted(workExperienceRequest.getDateStarted());
//            workExperience.setDateEnded(workExperienceRequest.getDateEnded());
//            workExperience.setProfile(profile);
//            workExperiences.add(workExperience);
//        }
//        profile.setWorkExperiences(workExperiences);
//
//        profile.setTechnicalSkills(profileUpdateRequest.getTechnicalSkills());
//        profile.setImage(profileUpdateRequest.getImage());
//
//        profileRepository.save(profile);
//        return profile;
//    }


//    public Profile updateProfile(String userId, Profile profile) {
//        Profile existingProfile = profileRepository.findByUser_Id(userId);
//        if (existingProfile == null) {
//            // Create a new profile if it doesn't exist
//            existingProfile = new Profile();
//            existingProfile.setUser(new User(userId)); // assuming User is the entity for the user
//        }
//
//        // Update the existing profile with the new data
//        existingProfile.setFullName(profile.getFullName());
//        existingProfile.setEmail(profile.getEmail());
//        existingProfile.setPhoneNumber(profile.getPhoneNumber());
//        existingProfile.setPhysicalAddress(profile.getPhysicalAddress());
//        existingProfile.setWorkExperience(profile.getWorkExperience());
//        existingProfile.setTechnicalSkills(profile.getTechnicalSkills());
//        existingProfile.setImage(profile.getImage());
//
//        // Save the updated profile
//        Profile savedProfile = profileRepository.save(existingProfile);
//
//        // Create a new Profile object for the response
//        Profile responseProfile = new Profile();
//        responseProfile.setFullName(savedProfile.getFullName());
//        responseProfile.setEmail(savedProfile.getEmail());
//        responseProfile.setPhoneNumber(savedProfile.getPhoneNumber());
//        responseProfile.setPhysicalAddress(savedProfile.getPhysicalAddress());
//        responseProfile.setWorkExperience(savedProfile.getWorkExperience());
//        responseProfile.setTechnicalSkills(savedProfile.getTechnicalSkills());
//        responseProfile.setImage(savedProfile.getImage());
//
//        return responseProfile;
//    }




//    @Transactional
//    public Profile updateProfile(String userId, Profile profile) {
//        User user = userRepository.findById(userId).orElseThrow();
//        Profile existingProfile = user.getProfile();
//        if (existingProfile == null) {
//            existingProfile = new Profile();
//            existingProfile.setUser(user);
//        }
//
//        profile.getWorkExperience().clear();
//
//        // Update the existing profile with the new data
//        existingProfile.setFullName(profile.getFullName());
//        existingProfile.setEmail(profile.getEmail());
//        existingProfile.setPhoneNumber(profile.getPhoneNumber());
//        existingProfile.setPhysicalAddress(profile.getPhysicalAddress());
//        existingProfile.setWorkExperience(profile.getWorkExperience());
//        existingProfile.setTechnicalSkills(profile.getTechnicalSkills());
//        existingProfile.setImage(profile.getImage());
//
//        return entityManager.merge(existingProfile);
//    }

    @Transactional
    public Profile updateProfile(String userId, Profile profile) {
        Profile existingProfile = profileRepository.findByUser_Id(userId);


        if(existingProfile != null) {
            // Update the existing profile with the new data
            existingProfile.setFull_name(profile.getFull_name());
            existingProfile.setEmail(profile.getEmail());
            existingProfile.setPhone_number(profile.getPhone_number());
            existingProfile.setPhysical_address(profile.getPhysical_address());
            existingProfile.setWorkExperience(profile.getWorkExperience());
            existingProfile.setTechnicalSkills(profile.getTechnicalSkills());
            existingProfile.setImage(profile.getImage());

            // Save the updated profile
            return profileRepository.save(existingProfile);
        } else {
            throw  new RuntimeException("Profile not found");
        }


    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }
}