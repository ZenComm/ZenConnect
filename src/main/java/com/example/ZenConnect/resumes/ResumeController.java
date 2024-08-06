package com.example.ZenConnect.resumes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload/{userProfileId}")
    public ResponseEntity<String> uploadResume(
            @PathVariable Long userProfileId,
            @RequestParam("file") MultipartFile file) {
        try {
            resumeService.storeResume(userProfileId, file);
            return ResponseEntity.ok("Resume uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload resume.");
        }
    }

    @GetMapping("/download/{userProfileId}")
    public ResponseEntity<byte[]> downloadResume(@PathVariable Long userProfileId) {
        try {
            Resume resume = resumeService.getResume(userProfileId);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(resume.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resume.getFileName() + "\"")
                    .body(resume.getData());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

