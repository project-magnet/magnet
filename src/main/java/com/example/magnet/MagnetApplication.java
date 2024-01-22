package com.example.magnet;

import com.example.magnet.global.auth.details.MemberDetailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;
import java.util.UUID;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableJpaAuditing
public class MagnetApplication {
	// jwttokenprovider를 통해 주입 그 후 토큰 반환
	Authentication authentication;


	public static void main(String[] args) {
		SpringApplication.run(MagnetApplication.class, args);
	}

	@Bean
	public AuditorAware<String> auditorProvider(){
		// AuditorAware을 넘긴다. 해당 값들을 꺼내서 등록자, 수정자를 채워준다.
		return () -> {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String currentUserId = null;

			if (authentication != null && authentication.isAuthenticated()) {
				currentUserId = String.valueOf(authentication.getCredentials());
			}
			return Optional.ofNullable(currentUserId);
		};
	}

}
