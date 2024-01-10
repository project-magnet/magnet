package com.example.magnet.member.repository;

import com.example.magnet.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String username);

    @Query("SELECT m FROM Member m " +
            "LEFT JOIN FETCH m.menteeList " +
            "LEFT JOIN FETCH m.mentorList " +
            "LEFT JOIN FETCH m.mentoringList " +
            "WHERE m.id = :memberId")
    Optional<Member> findByIdWithMenteeMentorMentoring(@Param("memberId") Long memberId);


}
