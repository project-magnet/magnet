package com.example.magnet.mentoring.repository;

import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.dto.mentoringListPagingDto;
import com.example.magnet.mentoring.entity.Mentoring;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GetMentoringRepository {
    Mentoring findMentoringByMentoringId(Long mentoringId);
    Page<mentoringListPagingDto> mentoringList(Pageable pageable);
}
