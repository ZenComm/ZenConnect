package com.example.ZenConnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableJpaRepositories(basePackages = "com.example.ZenConnect")
public class ZenConnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZenConnectApplication.class, args);
	}

	@GetMapping("/")
	public String hello() {
		return "Hello World!";
	}
}
