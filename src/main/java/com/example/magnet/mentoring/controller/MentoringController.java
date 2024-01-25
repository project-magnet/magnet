package com.example.magnet.mentoring.controller;

import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.service.MentoringService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mentoring")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MentoringController {
    private final MentoringService mentoringService;


    // 멘토링 등록
//    @PostMapping("/create")
//    public ResponseEntity<?> registerMentoring(@Valid @RequestBody MentoringPostDto mentoringPostDto, Authentication authentication){
//        // 권한 확인
//        Long memberId = (Long) authentication.getCredentials();
//        List<String> roles = authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .toList();
//
//        // 멘토 권한이 존재하면
//        if(authentication.getAuthorities().contains("MENTOR")){
//            mentoringService.register(memberId);
//        }else{
//
//        }
//
//    }

    // 멘토링 단건 조회

    // 멘토링 전체 리스트 조회

    // 멘토링 수정

    // 멘토링 삭제
}
