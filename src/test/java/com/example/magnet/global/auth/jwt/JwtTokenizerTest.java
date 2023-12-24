package com.example.magnet.global.auth.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.io.Decoders;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.BeforeAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;


import java.util.*;
import java.util.concurrent.TimeUnit;


import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS) // 같은 클래스 내의 모든 테스트 메소드가 동일한 인스턴스 공유
class JwtTokenizerTest {
    private static JwtTokenizer jwtTokenizer;
    private String secretKey;
    private String base64EncodedSecretKey;

    @BeforeAll
    public void init() { // secret key encoding
        jwtTokenizer = new JwtTokenizer();
        secretKey = "kevin1234123412341234123412341234";  // encoded "a2V2aW4xMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0"

        base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(secretKey);
    }

    @Test
    @DisplayName("원본 secretKey, 인코딩된 secretKey 비교")
    void encodeBase64SecretKey() {
        System.out.println("Secret key - encoded: " + base64EncodedSecretKey);

        assertThat(secretKey, is(new String(Decoders.BASE64.decode(base64EncodedSecretKey))));
    }

    @Test
    @DisplayName("access token 생성 테스트")
    void generateAccessToken() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", 1);
        claims.put("roles", List.of("USER"));

        String subject = "test access token";
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 10);
        Date expiration = calendar.getTime();

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        System.out.println(accessToken);

        assertThat(accessToken, notNullValue());
    }

    @Test
    @DisplayName("refresh token 생성 테스트")
    void generateRefreshToken() {
        String subject = "test refresh token";
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, 24);
        Date expiration = calendar.getTime();

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        System.out.println(refreshToken);

        assertThat(refreshToken, notNullValue());
    }

    // signature 검증 테스트

    private String getAccessToken(int timeUnit, int timeAmount){ // access token 시간조절
        Map<String, Object> claims = new HashMap<>();
        claims.put("id",1);
        claims.put("role",List.of("USER"));
        String subject = "access token 테스트";
        Calendar calendar = Calendar.getInstance();
        calendar.add(timeUnit, timeAmount);
        Date expiration = calendar.getTime();
        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);
        return accessToken;
    }

    @Test
    @DisplayName("jwt Signature 검증 테스트")
    public void verifySignatureTest(){
        String accessToken = getAccessToken(Calendar.MINUTE, 10);
        // 예외를 던지지 않으면 검증 통과
        assertDoesNotThrow(() -> jwtTokenizer.verifySignature(accessToken, base64EncodedSecretKey));

    }

    @Test
    @DisplayName("jwt 만료 테스트")
    public void tokenExpirationTest() throws InterruptedException{
        String accessToken = getAccessToken(Calendar.SECOND,1);
        assertDoesNotThrow(() -> jwtTokenizer.verifySignature(accessToken, base64EncodedSecretKey));
        TimeUnit.MILLISECONDS.sleep(1100); // 만료시간 초과
        assertThrows(ExpiredJwtException.class, () -> jwtTokenizer.verifySignature(accessToken,base64EncodedSecretKey));
    }
}