package com.example.magnet.mentoring.repository;

import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.dto.QmentoringListPagingDto;
import com.example.magnet.mentoring.dto.mentoringListPagingDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.magnet.mentoring.entity.QMentoring.mentoring;
import static com.example.magnet.mentor.entity.QMentor.mentor;

@Repository
public class GetMentoringRepositoryImpl implements GetMentoringRepository{
    private final JPAQueryFactory jpaQueryFactory;
    public GetMentoringRepositoryImpl(EntityManager em){
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Mentoring findMentoringByMentoringId(Long mentoringId){
        Mentoring findMentoring = jpaQueryFactory
                .selectFrom(mentoring)
                .leftJoin(mentoring.mentor, mentor)
                .where(mentoring.id.eq(mentoringId))
                .fetchOne();

        return findMentoring;
    }

    @Override
    public Page<mentoringListPagingDto> mentoringList(Pageable pageable){
        List<mentoringListPagingDto> content = jpaQueryFactory
                .select(new QmentoringListPagingDto(
                        mentoring.id,
                        mentoring.title,
                        mentoring.content,
                        mentoring.pay,
                        mentoring.period,
                        mentoring.participants,
                        mentoring.category.stringValue(), // 생성자와 순서 일치?
                        mentoring.mentor.id,
                        mentor.aboutMe,
                        mentor.field,
                        mentor.task,
                        mentor.mentorName,
                        mentor.career))
                .from(mentoring)
                .leftJoin(mentoring.mentor, mentor).fetchJoin()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = jpaQueryFactory
                .select(mentoring.count())
                .from(mentoring)
                .leftJoin(mentoring.mentor, mentor)
                .fetchOne();

        return new PageImpl<>(content, pageable, total);

    }
}
