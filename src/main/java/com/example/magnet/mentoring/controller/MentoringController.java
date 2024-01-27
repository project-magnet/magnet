package com.example.magnet.mentoring.controller;

import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.mapper.MentoringMapper;
import com.example.magnet.mentoring.service.MentoringService;
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
import java.util.stream.Collectors;

import static com.example.magnet.mentoring.mapper.MentoringMapper.mentoringPostDtoToMentoring;

//import static com.example.magnet.mentoring.mapper.MentoringMapper.mentoringPostDtoToMentoring;

@RestController
@RequestMapping("/mentoring")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MentoringController {
    private final MentoringService mentoringService;


    // 멘토링 등록
    @PostMapping("/create")
    public ResponseEntity<?> registerMentoring(@Valid @RequestBody MentoringPostDto mentoringPostDto, Authentication authentication){
        // 권한 확인
        Long memberId = (Long) authentication.getCredentials();

        Mentoring mentoring = mentoringPostDtoToMentoring(mentoringPostDto);
        mentoringService.register(memberId, mentoring);
        return new ResponseEntity<>("멘토링이 개설되었습니다.", HttpStatus.OK);

    }

    // 멘토링 단건 조회
//    @GetMapping("/get/{mentoring-id}")
//    public ResponseEntity<MentoringResponseDto> getMentoring(@Valid @PathVariable("mentoring-id") Long mentoringId){
//        return new ResponseEntity<MentoringResponseDto>(mentoringService.mentoringInfo(mentoringId), HttpStatus.OK);
//    }


    // 멘토링 전체 리스트 조회

    // 멘토링 수정

    // 멘토링 삭제
}
