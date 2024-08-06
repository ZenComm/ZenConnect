package com.example.ZenConnect.resumes;

import com.example.ZenConnect.profile.Profile;
import com.example.ZenConnect.profile.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public Resume storeResume(Long id, MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();

        Profile profile = profileRepository.findById(String.valueOf(id))
                .orElseThrow(() -> new Exception("Profile not found"));

        Resume resume = new Resume();
        resume.setFileName(fileName);
        resume.setFileType(fileType);
        resume.setData(file.getBytes());
        resume.setUploadedAt(LocalDateTime.now());
        resume.setProfile(profile);

        return resumeRepository.save(resume);
    }

    public Resume getResume(Long profileId) throws Exception {
        return resumeRepository.findByProfileId(profileId);
    }
}