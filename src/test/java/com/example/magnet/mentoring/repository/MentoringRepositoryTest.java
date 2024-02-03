//package com.example.magnet.mentoring.repository;
//
//import com.example.magnet.mentor.entity.Mentor;
//import com.example.magnet.mentoring.entity.Mentoring;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import jakarta.persistence.EntityManager;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import static com.example.magnet.mentor.entity.QMentor.mentor;
//import static com.example.magnet.mentoring.entity.QMentoring.mentoring;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class MentoringRepositoryTest {
//    @Mock
//    EntityManager em;
//
//    @Mock
//    JPAQueryFactory jpaQueryFactory;
//
//    @InjectMocks
//    MentoringRepository mentoringRepository;
//
//    @BeforeEach
//    public void before(){
//        jpaQueryFactory = new JPAQueryFactory(em);
//        Mentor mentor1 = Mentor.builder().id(1L).mentorName("test1").build();
//        Mentoring mentoring1 = Mentoring.builder().id(1L).mentor(mentor1).build();
//        Mentoring mentoring2 = Mentoring.builder().id(2L).mentor(mentor1).build();
//        Mentoring mentoring3 = Mentoring.builder().id(3L).mentor(mentor1).build();
//
//        Mentor mentor2 = Mentor.builder().id(2L).mentorName("test2").build();
//        Mentoring mentoring4 = Mentoring.builder().id(4L).mentor(mentor2).build();
//        Mentoring mentoring5 = Mentoring.builder().id(5L).mentor(mentor2).build();
//        Mentoring mentoring6 = Mentoring.builder().id(6L).mentor(mentor2).build();
//
//    }
//
//    @Test
//    @DisplayName("mentoring조회 - mentor 일치 여부 판단")
//    public void findMentoringByMentoringId(){
//        Mentoring findMentoring = jpaQueryFactory
//                .selectFrom(mentoring)
//                .leftJoin(mentoring.mentor, mentor)
//                .where(mentoring.id.eq(mentoring.id))
//                .fetchOne();
//
//        assertThat(findMentoring.getMentor().getId()).isEqualTo(1L);
//    }
//
//}