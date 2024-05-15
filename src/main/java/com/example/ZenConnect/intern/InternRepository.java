package com.example.ZenConnect.intern;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternRepository
        extends JpaRepository<Intern, Long> {
}
