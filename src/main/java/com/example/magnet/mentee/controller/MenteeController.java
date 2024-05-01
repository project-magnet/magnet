package com.example.magnet.mentee.controller;

import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.service.MenteeService;
import com.example.magnet.mentor.dto.MentorsMenteeDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        menteeService.paidMentee(menteePostDto, memberId, roles);
        return new ResponseEntity<>("멘토링 신청이 완료되었습니다.", HttpStatus.OK);
    }

//    @PostMapping("/create")
//    public ResponseEntity<String> createMenteeV2(RequestTossContext requestTossContext, Authentication authentication, @RequestParam @Validated String paymentKey){
//        // paymentKey가 존재한다면 mentee 정보 저장
//        Long memberId = (Long)authentication.getCredentials();
//        menteeService.paidMenteeV2(requestTossContext, memberId, paymentKey);
//        return new ResponseEntity<>("멘토링 신청이 완료되었습니다.", HttpStatus.OK);
//    }

    @GetMapping("/get/{mentee-id}")
    public ResponseEntity<MenteeResponseDto> menteeInfo(@Valid @PathVariable("mentee-id") Long menteeId, Authentication authentication){
        return new ResponseEntity<>(menteeService.getInfo(menteeId, (Long)authentication.getCredentials()),HttpStatus.OK);
    }

    // 회원조회 - 멘토 - 멘토링 - 멘티 리스트 조회
    @GetMapping("/list/{mentoring-id}")
    public ResponseEntity<List<AppliedMenteesDto>> mentees(@Valid @PathVariable("mentoring-id") Long mentoringId){
        return new ResponseEntity<>(menteeService.getAppliedMentees(mentoringId), HttpStatus.OK);
    }
}
