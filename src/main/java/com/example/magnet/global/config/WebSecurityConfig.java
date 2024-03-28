package com.example.magnet.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebMvcConfigurer의 addCorsMappings로 cors 헤더 누락 해결 시도 - .exposedHeaders("Access-Control-Allow-Origin"); 적용
 * */
//@EnableWebSecurity
@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080")
                .allowedOrigins("http://43.203.58.41:8080")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("https://www.project-magnet.site")
                .allowedMethods("*")
                .allowCredentials(true)
                .allowedHeaders("*")
                .exposedHeaders("Access-Control-Allow-Origin");

    }
}
