//package com.example.magnet.global.auth.oauth;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.AuthenticationFailureHandler;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Component
//@Slf4j
//public class MyAuthenticationFailureHandler implements AuthenticationFailureHandler {
//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
//        // 인증 실패시 메인 페이지로 이동
//        response.sendRedirect("http://localhost:8080/login"); // 로컬 로그인 페이지로 리다이렉트
//    }
//
//}
