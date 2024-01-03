package com.example.magnet.global.auth.handler;

import com.example.magnet.global.auth.jwt.JwtTokenizer;
import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.service.MemberService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * - JWT를 생성하고, Frontend 쪽으로 JWT를 전송하기 위해 Redirect 하는 로직을 구현
 * - Resource Owner의 이메일 주소를 DB에 저장
 * - MemberService가 null로 주입되는 오류로 ApplicationContext에서 직접 memberService 주입받음
 * */

@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @Builder
    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
                                      CustomAuthorityUtils authorityUtils,
                                      MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    /**
     *  - 상위 클래스의 handle() 메서드를 호출해서 대상 URL로 리다이렉션 하고, 남은 세션 데이터를 삭제하기 위해
     *    clearAuthenticationAttributes() 호출하는 함수
     * */

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{
        // authentication 객체에서 사용자 정보 추출
        var oAuth2User = (OAuth2User)authentication.getPrincipal();// 현재 사용자를 나타내는 principal 객체를 가져와 캐스팅
        String email = String.valueOf(oAuth2User.getAttributes().get("email")); // 이메일 추출
        List<String> authorities = authorityUtils.createRoles(email); // 추출한 이메일 기반의 권한 정보 생성

//        saveMember(email); // Resource Owner의 이메일 주소를 DB에 저장
        redirect(request, response, email, authorities);// Access Token과 Refresh Token을 생성 후 프론트에 전달
    }

//    private void saveMember(String email){ // 권한이 생성된 이메일을 DB에 저장 > 조회용
//        Member member = Member.builder().email(email).build();
////        Member member = new Member(email);
////        MemberService memberService = applicationContext.getBean(MemberService.class);
//        memberService.createMember(member);
//
//        log.info("데이터베이스에 저장");
//    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken, refreshToken).toString();   // Frontend 애플리케이션으로 보내는 URL을 생성
        getRedirectStrategy().sendRedirect(request, response, uri);   //AbstractAuthenticationTargetUrlRequestHandler의 메소드 구현
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    //http://localhost/receive-token.html?access_token=<Access Token 값>&refresh_token=<Refresh Token 값>
    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder // Access Token과 Refresh Token을 포함한 URL을 생성
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(8080) // default
                .path("/login/oauth2/code/google") // /receive-token.html
                .queryParams(queryParams)
                .build()
                .toUri();
    }



}
