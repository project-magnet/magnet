package com.example.magnet.mentee.repository;

import com.example.magnet.mentee.entity.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenteeRepository extends JpaRepository<Mentee, Long> {
    Optional<Mentee> findByIdAndMemberId(Long menteeId, Long memberId);
}
