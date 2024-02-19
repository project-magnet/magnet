package com.example.magnet.mentee.controller;

import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.service.MenteeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mentee")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MenteeController {
    private final MenteeService menteeService;

    // 멘티 등록 = 멘토링 신청
    @PostMapping("/create")
    public ResponseEntity<String> createMentee(@Valid @RequestBody MenteePostDto menteePostDto, Authentication authentication){
        // payment 테이블에 멤버id가 현재 authentication의 멤버 아이디와 같다면 멘티 생성

        return new ResponseEntity<>("멘토링 신청이 완료되었습니다.", HttpStatus.OK);
    }
}
