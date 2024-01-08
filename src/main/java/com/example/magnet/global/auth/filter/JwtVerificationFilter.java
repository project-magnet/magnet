package com.example.magnet.global.auth.filter;


import com.example.magnet.global.auth.dto.UserInfoDto;
import com.example.magnet.global.auth.jwt.JwtTokenizer;
import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;// jwt 검증용, claims 획득 목적
    private final CustomAuthorityUtils authorityUtils; // jwt 검증 성공 시 Authentication 객체에 채울 사용자의 권한 생성


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e); // AuthenticationEntryPoint에서 사용
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer"); // 자격증명과 무관한 요청이 들어오면 다음 필터로 전달
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();  // jwt parsing = verification

        return claims;
    }

    // JWT 검증 후 특정 사용자 정보를 Controller에 DI하기 위한 로직
//    private void extractUserInfo(HttpServletRequest request){
//        Map<String, Object> claims = verifyJws(request);
//
//        Long memberId = Long.valueOf(claims.get("memberId").toString());
//        String username = (String) claims.get("username");
//        List<String> roles = (List<String>) claims.get("roles");
//
//        UserInfoDto userInfoDto = UserInfoDto.builder()
//                .memberId(memberId)
//                .username(username)
//                .roles(roles)
//                .build();
//
//        userInfoDto.setUserInfoDto(userInfoDto);
//    }

    private void setAuthenticationToContext(Map<String, Object> claims) { // SecurityContextHolder의 Authentication이 사용자의 이름과 역할을 관리
        String username = (String) claims.get("username");
        Long memberId = Long.valueOf(claims.get("memberId").toString());
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        log.info("username: " + username);
        log.info("memberId: " + memberId);
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, memberId, authorities); // claims 값을 기반으로 사용자 정보 객체 생성
        SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContextHolder에 저장
    }


}
