package com.example.magnet.member.repository;

import com.example.magnet.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.example.magnet.member.entity.QMember.member;
import static com.example.magnet.mentee.entity.QMentee.mentee;
import static com.example.magnet.mentor.entity.QMentor.mentor;
import static com.example.magnet.mentoring.entity.QMentoring.mentoring;
import static com.example.magnet.payment.entity.QPayment.payment;

@Repository
public class MemberCustomRepositoryImpl implements MemberCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;
    public MemberCustomRepositoryImpl(EntityManager em){
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Member findByFetchJoinV2(Long memberId){
        return jpaQueryFactory
                .selectFrom(member)
                .leftJoin(mentoring.member).fetchJoin()
                .join(mentor.member)
                .join(mentee.member)
                .join(payment.member)
                .where(member.id.eq(memberId))
                .fetchOne();

    }

}
