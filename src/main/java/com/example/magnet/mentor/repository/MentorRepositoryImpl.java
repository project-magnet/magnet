package com.example.magnet.mentor.repository;

import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDtoV2;
import com.example.magnet.mentor.dto.QMentorSearchResponseDto;
import com.example.magnet.mentor.dto.QMentorSearchResponseDtoV2;
import com.example.magnet.mentor.entity.Mentor;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    // 멘토의 정보를 리스트로 반환합니다.
//    @Override
//    public Page<MentorSearchResponseDto> search(Pageable pageable) {
//        List<MentorSearchResponseDto> content =  jpaQueryFactory
//                .select(new QMentorSearchResponseDto(
//                        mentor.id,
//                        mentor.mentorName,
//                        mentor.career,
//                        mentor.field,
//                        mentor.task,
//                        mentor.aboutMe,
//                        mentor.email,
//                        mentor.phone,
//                        mentor.github,
//                        mentoring.id, // mentoring 정보
//                        mentoring.title,
//                        mentoring.content,
//                        mentoring.pay,
//                        mentoring.period,
//                        mentoring.participants,
//                        mentoring.category
//                        )
//                )
//                .from(mentor)
//                .leftJoin(mentor.mentoringList, mentoring)
//                .orderBy(mentor.mentorName.desc())
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//        //mentoring responsedto를 추가적으로 조회, 그리고 멘토 리스트와 결합한다.
//
//        Long total = jpaQueryFactory
//                .select(mentor.count())
//                .from(mentor)
//                .leftJoin(mentor.mentoringList, mentoring)
//                .fetchOne();
//
//        return new PageImpl<>(content, pageable, total);
//    }

    @Override
    public Page<MentorSearchResponseDtoV2> search2(Pageable pageable) {
        List<MentorSearchResponseDtoV2> content =  jpaQueryFactory
                .select(new QMentorSearchResponseDtoV2(mentor))
                .from(mentor)
                .join(mentor.mentoringList, mentoring).fetchJoin()
                .orderBy(mentor.mentorName.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        //mentoring responsedto를 추가적으로 조회, 그리고 멘토 리스트와 결합한다.

        Long total = jpaQueryFactory
                .select(mentor.count())
                .from(mentor)
                .leftJoin(mentor.mentoringList, mentoring)
                .fetchOne();

        return new PageImpl<>(content, pageable, total);
    }


}
