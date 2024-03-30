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

    private void setAuthenticationToContext(Map<String, Object> claims) { // SecurityContextHolder의 Authentication이 사용자의 이름과 역할을 관리
        String username = (String) claims.get("username"); // name
        Long memberId = Long.valueOf(claims.get("memberId").toString()); // credentials
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(memberId); // 역할정보 - memberId기반 DB조회  (List)claims.get("roles")
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, memberId, authorities); // claims 값을 기반으로 사용자 정보 객체 생성
        SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContextHolder에 저장
        log.info("securityContextHolder 에 로그인한 사용자 정보 저장");
    }


}
