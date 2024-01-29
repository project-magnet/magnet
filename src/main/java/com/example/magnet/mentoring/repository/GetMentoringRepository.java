package com.example.magnet.mentoring.repository;

import com.example.magnet.mentoring.entity.Mentoring;

public interface GetMentoringRepository {
    Mentoring findMentoringByMentoringId();
}
