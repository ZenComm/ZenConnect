package com.example.ZenConnect.resumes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Resume findByProfileId(Long profileId);
}



