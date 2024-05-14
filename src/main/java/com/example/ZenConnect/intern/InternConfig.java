package com.example.ZenConnect.intern;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class InternConfig {

    @Bean
    CommandLineRunner commandLineRunner(InternRepository repository) {
        return  args -> {
            Intern Zack = new Intern(
                    "Zack",
                    "Smith",
                    "zack@email.com"
            );

            Intern Alex = new Intern(
                    "Alex",
                    "Brown",
                    "alex@email.com"
            );

            Intern Josh = new Intern(
                    "Josh",
                    "Buthelezi",
                    "josh.buthelezi@email.com"
            );

            repository.saveAll(
                    List.of(Zack,Alex,Josh)
            );
        };
    }

}
