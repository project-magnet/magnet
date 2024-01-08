package com.example.magnet.member.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.member.entity.Address;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

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

    @Test
    @DisplayName("회원수정-주소 빌더에 null이 포함된 경우")
    void updateMember_modify(){
        // given
        Member existingMember = Member.builder()
                .id(1L)
                .nickName("OldNickName")
                .phone("OldPhone")
                .address(Address.builder().city("OldCity").street("OldStreet").build())
                .build();

        Member updatedMember = Member.builder()
                .id(1L)
                .nickName("NewNickName")
                .phone("NewPhone")
                .address(Address.builder().city(null).street("NewStreet").build()) // null 포함된 경우
                .build();

        //when
        when(memberRepository.findById(1L)).thenReturn(Optional.ofNullable(existingMember));

        //then
        assertThatThrownBy(() -> memberService.updateMember(updatedMember))
                .isInstanceOf(NullPointerException.class);
    }
}