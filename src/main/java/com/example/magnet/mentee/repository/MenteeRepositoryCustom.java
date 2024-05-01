package com.example.magnet.mentee.repository;

import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.dto.MenteeResponseDto;

import java.util.List;

public interface MenteeRepositoryCustom {
    List<AppliedMenteesDto> mentees(Long mentoringId);
}
