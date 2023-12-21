package com.example.magnet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MagnetApplication {

	public static void main(String[] args) {
		SpringApplication.run(MagnetApplication.class, args);
	}

}
