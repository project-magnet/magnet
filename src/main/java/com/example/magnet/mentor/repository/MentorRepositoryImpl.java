package com.example.magnet.mentor.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import static com.example.magnet.mentor.entity.QMentor;

@Repository
public class MentorRepositoryImpl implements MentorRepository{
    private final JPAQueryFactory jpaQueryFactory;

    public MentorRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
