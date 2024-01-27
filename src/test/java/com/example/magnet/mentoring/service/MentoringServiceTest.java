package com.example.magnet.mentoring.service;

import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.repository.MentorRepository;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.repository.MentoringRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@Transactional
@ExtendWith(MockitoExtension.class)
class MentoringServiceTest {

    @Mock
    MemberRepository memberRepository;

    @Mock
    MentorRepository mentorRepository;

    @Mock
    MentoringRepository mentoringRepository;
    @Mock
    Member mockMember;
    @Mock
    Mentor mockMentor;

    @InjectMocks
    MentoringService mentoringService;

//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    MentorRepository mentorRepository;
//    @Autowired
//    MentoringRepository mentoringRepository;
//    @Autowired
//    MentoringService mentoringService;


//    @Test
//    @DisplayName("멘토링 등록 테스트")
//    public void register(){
//        //given
//        Member member = Member.builder().id(1L).email("email@gmail.com").password("1234").build();
//        Mentor mentor = Mentor.builder()
//                .id(1L)
//                .member(member)
//                .build();
//
//        Mentoring mentoring = Mentoring.builder()
//                .id(1L)
//                .mentor(mentor)
//                .title("mentoring-1")
//                .build();
//
//        memberRepository.save(member);
//        mentorRepository.save(mentor);
//        mentoringRepository.save(mentoring);
//
//        //when - mock
////        when(mentorRepository.findByMemberId(1L)).thenReturn(Optional.of(mentor));
//
//        mentoringService.register(1L, mentoring);
//
//        // then
//        Mentoring mentoring1 = mentoringRepository.findById(1L).orElse(null);
//
//        assertNotNull(mentoring1);
//        assertEquals(mentor.getId(), mentoring1.getMentor().getId());
//        assertEquals(member.getId(), mentoring1.getMember().getId());
//
//    }

    @Test
    @DisplayName("멘토링 등록 테스트 - mockito 적용")
    public void register2(){
        Long memberId = 1L;

        //given
        Member member = Member.builder().id(memberId).email("email@gmail.com").password("1234").build();
        Mentor mentor = Mentor.builder()
                .id(memberId)
                .member(member)
                .build();

        Mentoring mentoring = Mentoring.builder()
                .id(memberId)
                .mentor(mentor)
                .title("mentoring-1")
                .build();

        // 어떤 Long 타입이 들어가도 결과는 미리 선언한 객체들일 것이다.
        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(member));
        when(mentorRepository.findByMemberId(anyLong())).thenReturn(Optional.of(mentor));

        mentoringService.register(1L, mentoring);

        //mentoring 저장이 한번 이뤄졌는지 검증
        verify(mentoringRepository, times(1)).save(any(Mentoring.class));
    }

}