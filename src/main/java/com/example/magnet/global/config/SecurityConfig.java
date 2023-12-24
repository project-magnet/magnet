package com.example.magnet.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/login").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager( // 인증 매니저 설정
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);
    }

//    @Bean
//    public UserDetailsService userDetailsService() { // inmemoryUser 등록 - sample code
//        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
//
//        UserDetails user = User.withUsername("dong")
//                .password(encoder.toString())
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.withUsername("admin")
//                .password(encoder.toString())
//                .roles("ADMIN")
//                .build();
//
//        UserDetails mentor = User.withUsername("mentor")
//                .password(encoder.toString())
//                .roles("MENTOR")
//                .build();
//
//        UserDetails mentee = User.withUsername("mentee")
//                .password(encoder.toString())
//                .roles("MENTEE")
//                .build();
//
//        return new InMemoryUserDetailsManager(user, admin, mentor, mentee);
//    } - inmemory 관련 내용이라 제거

    @Bean
    public PasswordEncoder passwordEncoder() { // 기본적인 패스워드 인코딩 생성
        return PasswordEncoderFactories.createDelegatingPasswordEncoder(); // DelegatingPasswordEncoder가 실질적으로 PasswordEncoder 구현 객체를 생성
    }
}
