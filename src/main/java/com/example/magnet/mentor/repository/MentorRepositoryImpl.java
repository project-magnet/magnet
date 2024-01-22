package com.example.magnet.mentor.repository;

import com.example.magnet.mentor.entity.Mentor;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import static com.example.magnet.mentor.entity.QMentor.mentor;

import java.util.List;

import static com.example.magnet.mentoring.entity.QMentoring.mentoring;

@Repository
public class MentorRepositoryImpl implements MentorCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    public MentorRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Mentor> findAllLeftJoin() {
        return jpaQueryFactory
                .selectFrom(mentor)
                .leftJoin(mentor.mentoringList, mentoring)
                .on(mentor.id.eq(mentor.id))
                .fetchJoin()
                .fetch();
    }


}
