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
        // paymentKey가 존재한다면 mentee 정보 저장
        Long memberId = (Long)authentication.getCredentials();
        menteeService.paidMentee(menteePostDto, memberId);
        return new ResponseEntity<>("멘토링 신청이 완료되었습니다.", HttpStatus.OK);
    }
}
