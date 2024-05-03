package com.example.magnet.mentee.repository;

import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.dto.QAppliedMenteesDto;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.magnet.mentee.entity.QMentee.mentee;
import static com.example.magnet.mentoring.entity.QMentoring.mentoring;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MenteeRepositoryImpl implements MenteeRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

//    public MenteeRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
//        this.jpaQueryFactory = jpaQueryFactory;
//    }

//    public MenteeRepositoryImpl(EntityManager em){
//        this.jpaQueryFactory = new JPAQueryFactory(em);
//    }


    @Override
    public List<AppliedMenteesDto> mentees(Long mentoringId){
        log.info("mentees 메소드 구현체 진입");
        return jpaQueryFactory
                .select(new QAppliedMenteesDto(
                        mentee.id,
                        mentee.member.nickName,
                        mentee.email,
                        mentee.schedule,
                        mentee.phone
                        ))
                .from(mentoring)
                .join(mentoring.menteeList, mentee)
                .where(mentoring.id.eq(mentoringId))
                .fetch();

    }
}
