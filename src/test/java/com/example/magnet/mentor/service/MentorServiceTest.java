package com.example.magnet.mentor.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.dto.QMentorSearchResponseDto;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.entity.QMentor;
import com.example.magnet.mentor.mapper.MentorMapper;
import com.example.magnet.mentor.repository.MentorRepository;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.repository.MentoringRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
class MentorServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MentorRepository mentorRepository;

    @Mock
    private MentoringRepository mentoringRepository;

    @Mock
    private CustomAuthorityUtils customAuthorityUtils;

    @Autowired
    EntityManager em;

    @Mock
    private JPAQueryFactory jpaQueryFactory;

    @InjectMocks
    private MentorService mentorService;


    private Member member;
    private Mentor mentor;

//    @BeforeEach
//    public void setUp(){
//        member = Member.builder()
//                .id(1L)
//                .roles(Arrays.asList("ROLE_USER", "ROLE_MENTOR"))
//                .build();
//
//        mentor = Mentor.builder()
//                .id(1L)
//                .member(member)
//                .build();
//
//        Authentication authentication = new UsernamePasswordAuthenticationToken("user", "password", List.of(new SimpleGrantedAuthority("ROLE_USER")));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//    }

    @Test
    @DisplayName("멘토등록 테스트")
    public void create_Mentor(){
        // given

        when(memberRepository.findById(member.getId())).thenReturn(Optional.of(member));

        List<GrantedAuthority> expectedAuthorities = List.of(
                new SimpleGrantedAuthority("ROLE_USER"),
                new SimpleGrantedAuthority("ROLE_MENTOR"));
//        when(customAuthorityUtils.createAuthorities(eq(List.of("USER", "MENTOR")))).thenReturn(expectedAuthorities);

        // when
//        mentorService.createMentor(member.getId(), );

        // then
        verify(memberRepository).save(member);
        verify(mentorRepository).save(any());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> updatedRoles = member.getRoles(); // 수정된 roles 확인
        assertThat(updatedRoles).contains("ROLE_MENTOR");
        assertThat(authentication.getAuthorities()).isEqualTo(expectedAuthorities);
    }

    @Test
    @DisplayName("멘토조회 테스트")
    public void getMentor() {
        //given
        // 멘토, 멘토링 개설
        Mentor mentor1 = Mentor.builder()
                .id(1L)
                .mentorName("admin")
                .career("3년")
                .field("백엔드")
                .email("admin@gmail.com")
                .phone("010-2222-2222")
                .aboutMe("안녕하세요 백엔드 개발자 admin입니다.")
                .github("github/1111asdf.com")
                .mentoringList(Arrays.asList(
                        Mentoring.builder()
                                .id(101L)
                                .title("웹 개발 기초")
                                .content("HTML, CSS, JavaScript 소개")
                                .pay("무료")
                                .period("4주")
                                .participants(20)
                                .build(),
                        Mentoring.builder()
                                .id(102L)
                                .title("Spring Boot 심화")
                                .content("Spring Boot 기반의 고급 웹 개발")
                                .pay("유료")
                                .period("8주")
                                .participants(15)
                                .build()
                ))
                .build();

        Mentoring mentoring1 = Mentoring.builder()
                .id(101L)
                .title("웹 개발 기초")
                .content("HTML, CSS, JavaScript 소개")
                .pay("무료")
                .period("4주")
                .participants(20)
                .mentor(mentor1)
                .build();

        Mentoring mentoring2 = Mentoring.builder()
                .id(102L)
                .title("Spring Boot 심화")
                .content("Spring Boot 기반의 고급 웹 개발")
                .pay("유료")
                .period("8주")
                .mentor(mentor1)
                .participants(15)
                .build();

        mentoringRepository.save(mentoring1);
        mentoringRepository.save(mentoring2);

        List<Mentoring> mentoringDtoList = Arrays.asList(mentoring1, mentoring2);

        //when
        when(mentorRepository.findByMemberId(1L)).thenReturn(Optional.ofNullable(mentor1));
        MentorResponseDto mentorResponseDto = mentorService.getMentor(1L);

        //then
        assertEquals(mentoringDtoList.size(), mentorResponseDto.getMentoringDtoList().size());
    }

//    @Test
//    @DisplayName("멘토 전체 리스트 조회 - querydsl 적용")
//    public void search() {
//        Mentor mentor1 = Mentor.builder()
//                .id(1L)
//                .mentoringList(Arrays.asList(
//                        Mentoring.builder()
//                                .id(1L)
//                                .build(),
//                        Mentoring.builder()
//                                .id(2L)
//                                .build()
//                ))
//                .build();
//
//        Mentor mentor2 = Mentor.builder()
//                .id(2L)
//                .mentoringList(Arrays.asList(
//                        Mentoring.builder()
//                                .id(3L)
//                                .build(),
//                        Mentoring.builder()
//                                .id(4L)
//                                .build()
//                ))
//                .build();
//
//        Mentor mentor3 = Mentor.builder()
//                .id(3L)
//                .mentoringList(Arrays.asList(
//                        Mentoring.builder()
//                                .id(5L)
//                                .build(),
//                        Mentoring.builder()
//                                .id(6L)
//                                .build()
//                ))
//                .build();
//        mentorRepository.save(mentor1);
//        mentorRepository.save(mentor2);
//        mentorRepository.save(mentor3);
//
//
//        Mentoring mentoring1 = Mentoring.builder().id(1L).mentor(mentor1).build();
//        Mentoring mentoring2 = Mentoring.builder().id(2L).mentor(mentor1).build();
//        Mentoring mentoring3 = Mentoring.builder().id(3L).mentor(mentor2).build();
//        Mentoring mentoring4 = Mentoring.builder().id(4L).mentor(mentor2).build();
//        Mentoring mentoring5 = Mentoring.builder().id(5L).mentor(mentor3).build();
//        Mentoring mentoring6 = Mentoring.builder().id(6L).mentor(mentor3).build();
//
//        mentoringRepository.save(mentoring1);
//        mentoringRepository.save(mentoring2);
//        mentoringRepository.save(mentoring3);
//        mentoringRepository.save(mentoring4);
//        mentoringRepository.save(mentoring5);
//        mentoringRepository.save(mentoring6);
//
//
//        Page<MentorSearchResponseDto> result = mentorService.search(0,3);
//
//        assertThat(result.getTotalElements()).isEqualTo(6);
//
//
//    }

    @Test
    @DisplayName("멘토 삭제 테스트")
    public void deleteMentor(){
        //given
        Member member1 = Member.builder().id(1L).build();

        Mentor mentor1 = Mentor.builder().id(1L).member(member1).build();

        Mentoring mentoring = Mentoring.builder().id(1L).mentor(mentor1).build();

        List<Mentoring> list = new ArrayList<>();
        list.add(mentoring);
        mentor1 = mentor1.toBuilder().mentoringList(list).build();

        memberRepository.save(member1);
        mentorRepository.save(mentor1);
        mentoringRepository.save(mentoring);


        when(mentorRepository.findByMemberId(1L)).thenReturn(Optional.of(mentor1));
        mentorService.remove(1L);

        // 검증: mentor와 관련된 mentoring까지 삭제 완료
        assertThat(mentorRepository.findById(1L)).isEmpty();
        assertThat(mentoringRepository.findById(1L)).isEmpty();

    }

}