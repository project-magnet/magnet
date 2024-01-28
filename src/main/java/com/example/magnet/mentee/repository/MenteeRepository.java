package com.example.magnet.mentee.repository;

import com.example.magnet.mentee.entity.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenteeRepository extends JpaRepository<Mentee, Long> {
}
