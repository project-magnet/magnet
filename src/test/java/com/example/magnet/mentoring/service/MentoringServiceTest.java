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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
class MentoringServiceTest {

//    @Mock
//    MemberRepository memberRepository;
//
//    @Mock
//    MentorRepository mentorRepository;
//
//    @Mock
//    MentoringRepository mentoringRepository;
//
//    @InjectMocks
//    MentoringService mentoringService;

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MentorRepository mentorRepository;
    @Autowired
    MentoringRepository mentoringRepository;
    @Autowired
    MentoringService mentoringService;


    @Test
    @DisplayName("멘토링 등록 테스트")
    public void register(){
        //given
        Member member = Member.builder().id(1L).email("email@gmail.com").password("1234").build();
        Mentor mentor = Mentor.builder()
                .id(1L)
                .member(member)
                .build();

        Mentoring mentoring = Mentoring.builder()
                .id(1L)
                .mentor(mentor)
                .title("mentoring-1")
                .build();

        memberRepository.save(member);
        mentorRepository.save(mentor);
        mentoringRepository.save(mentoring);

        //when - mock
//        when(mentorRepository.findByMemberId(1L)).thenReturn(Optional.of(mentor));

        mentoringService.register(1L, mentoring);

        // then
        Mentoring mentoring1 = mentoringRepository.findById(1L).orElse(null);

        assertNotNull(mentoring1);
        assertEquals(mentor.getId(), mentoring1.getMentor().getId());
        assertEquals(member.getId(), mentoring1.getMember().getId());

    }

}