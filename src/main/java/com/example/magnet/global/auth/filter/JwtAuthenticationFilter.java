package com.example.magnet.global.auth.filter;

import com.example.magnet.global.LoginDto;
import com.example.magnet.global.auth.jwt.JwtTokenizer;
import com.example.magnet.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * - 클라이언트의 인증 정보 수신 (username - email, password)
 * */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException{
        Member member = (Member) authResult.getPrincipal();
        String accessToken = delegateAccessToken(member); // delegateAccessToken(member) 메서드를 이용해 Access Token을 생성합니다.
        String refreshToken = delegateRefreshToken(member); // delegateRefreshToken(member) 메서드를 이용해 Refresh Token을 생성합니다.

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getId());  // 사용자 식별자 포함
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

}
