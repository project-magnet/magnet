package com.example.magnet.mentee.repository;

import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.entity.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenteeRepository extends JpaRepository<Mentee, Long>, MenteeRepositoryCustom {
    Optional<Mentee> findByIdAndMemberId(Long menteeId, Long memberId);
    List<AppliedMenteesDto> mentees(Long mentoringId);

    List<Mentee> findAllByMentoringId(Long mentoringId);// jpql용
}
