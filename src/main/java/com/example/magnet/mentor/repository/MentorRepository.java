package com.example.magnet.mentor.repository;

import com.example.magnet.mentor.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Long>, MentorCustomRepository {

    Optional<Mentor> findByMemberId(Long memberId);

}
