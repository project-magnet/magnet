package com.example.magnet.global.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Role 기반의 User 권한을 생성
 * - 해당 클래스로 로그인 인증을 처리하는 방식은 spring security가 내부적으로 인증을 대신 처리해 주는 방식이다.
 * */

@Component
public class CustomAuthorityUtils {
    @Value("${mail.address.admin}")
    private String adminMailAddress;

    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER", "ROLE_MENTOR", "ROLE_MENTEE");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_MENTOR", "ROLE_MENTEE");
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN");
    private final List<String> USER_ROLES_STRING = List.of("USER");


    // DB에 저장된 Role을 기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return authorities;
    }

    // DB 저장 용
    public List<String> createRoles(String email) {
        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
