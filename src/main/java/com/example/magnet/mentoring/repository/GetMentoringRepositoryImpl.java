//package com.example.magnet.mentoring.repository;
//
//import com.example.magnet.mentoring.entity.Mentoring;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import jakarta.persistence.EntityManager;
//import org.springframework.stereotype.Repository;
//
//import static com.example.magnet.mentoring.entity.QMentoring.mentoring;
//import static com.example.magnet.mentor.entity.QMentor.mentor;
//
//@Repository
//public class GetMentoringRepositoryImpl implements GetMentoringRepository{
//    private final JPAQueryFactory jpaQueryFactory;
//    public GetMentoringRepositoryImpl(EntityManager em){
//        this.jpaQueryFactory = new JPAQueryFactory(em);
//    }
//
//    @Override
//    public Mentoring findMentoringByMentoringId(){
//
//        Mentoring findMentoring = jpaQueryFactory
//                .selectFrom(mentoring)
//                .leftJoin(mentoring.mentor, mentor)
//
//    }
//}
