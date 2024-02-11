package com.example.magnet.member.entity;

import com.example.magnet.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class MemberTest {
    @Autowired
    MemberRepository memberRepository;
//
//    @InjectMocks
//    Member member;

    @Test
    @DisplayName("deleted test")
    void deleted_test() {
        Member member = Member.builder().id(1L).build();
        Member save = memberRepository.save(member);
        assertThat(save.getDeleted()).isEqualTo(false);
    }
}