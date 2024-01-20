package com.example.magnet.mentor.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.repository.MentorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class MentorServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MentorRepository mentorRepository;

    @Mock
    private CustomAuthorityUtils customAuthorityUtils;

    @InjectMocks
    private MentorService mentorService;

    private Member member;

    private Mentor mentor;

    @BeforeEach
    public void setUp(){
        member = Member.builder()
                .id(1L)
                .roles(Arrays.asList("ROLE_USER"))
                .build();

        mentor = Mentor.builder()
                .id(1L)
                .member(member)
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken("user", "password", List.of(new SimpleGrantedAuthority("ROLE_USER")));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    @DisplayName("멘토등록 테스트")
    public void create_Mentor(){
        // given
        Long memberId = 1L;

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));

        List<GrantedAuthority> expectedAuthorities = List.of(
                new SimpleGrantedAuthority("ROLE_USER"),
                new SimpleGrantedAuthority("ROLE_MENTOR"));
        when(customAuthorityUtils.createAuthorities(eq(List.of("USER", "MENTOR")))).thenReturn(expectedAuthorities);

        // when
        mentorService.createMentor(memberId, mentor);

        // then
        verify(memberRepository).save(member);
        verify(mentorRepository).save(any());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> updatedRoles = member.getRoles(); // 수정된 roles 확인
        assertThat(updatedRoles).contains("ROLE_MENTOR");
        assertThat(authentication.getAuthorities()).isEqualTo(expectedAuthorities);
    }

}