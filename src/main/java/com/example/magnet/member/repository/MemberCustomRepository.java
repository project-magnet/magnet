package com.example.magnet.member.repository;

import com.example.magnet.member.entity.Member;

import java.util.Optional;

public interface MemberCustomRepository {
    Member findByFetchJoinV2(Long memberId);
}
