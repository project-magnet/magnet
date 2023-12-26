package com.example.magnet.member.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

    @Mock
    MemberRepository memberRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    CustomAuthorityUtils authorityUtils;


    @InjectMocks
    MemberService memberService;

    @Test
    @DisplayName("회원 생성 테스트")
    void createMember() {
        //given
        String email = "test@gmail.com";

        //when

        assertThrows(BusinessLogicException.class, () -> memberService.verifyExistsEmail(email), "중복된 email입니다.");
        //then


    }
}