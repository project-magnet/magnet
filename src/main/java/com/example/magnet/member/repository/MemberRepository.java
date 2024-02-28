package com.example.magnet.member.repository;

import com.example.magnet.member.entity.Member;
import jakarta.persistence.NamedAttributeNode;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberCustomRepository {

    Optional<Member> findByEmail(String username);


    /**
     * mentoring만 fetch join을 적용하고 나머지는 지연로딩으로 가져오도록 한다.
     * */
    @Query("select distinct m from Member m " +
            "left join fetch m.mentoringList " +
            "left join m.mentorList " +
            "left join m.menteeList " +
            "left join m.paymentList " +
            "where m.id = :memberId")
    Optional<Member> findByFetchJoin(@Param("memberId") Long memberId);


}
