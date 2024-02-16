package com.example.magnet.mentoring.controller;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.dto.mentoringListPagingDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.mapper.MentoringMapper;
import com.example.magnet.mentoring.service.MentoringService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
        List<String> roles = authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();
        log.info("멘토링 등록 시도 유저의 권한 목록: {}" , roles);

        if(!roles.contains("ROLE_MENTOR")){
            throw new BusinessLogicException(ExceptionCode.MISSING_MENTOR_ROLE);
        }

        mentoringService.register(memberId, mentoringPostDto);
        return new ResponseEntity<>("멘토링이 개설되었습니다.", HttpStatus.OK);

    }

    // 멘토링 단건 조회
    @GetMapping("/get/{mentoring-id}")
    public ResponseEntity<MentoringResponseDto> getMentoring(@Valid @PathVariable("mentoring-id") Long mentoringId){
        return new ResponseEntity<>(mentoringService.mentoringInfo(mentoringId), HttpStatus.OK);
    }


    // 멘토링 전체 리스트 조회
    // 단순히 전체 멘토링 목록을 조회한다.
    @GetMapping("/list")
    public ResponseEntity<Page<mentoringListPagingDto>> getMentoringList(@RequestParam("offset") int offset, // or pageable
                                                                         @RequestParam("size") int size){
        return new ResponseEntity<>(mentoringService.mentoringInfoList(offset, size), HttpStatus.OK);
    }

    // 멘토링 리스트 필터링

    // 멘토링 수정

    // 멘토링 삭제
    @DeleteMapping("/remove/{mentoring-id}")
    public ResponseEntity<String> deleteMentoring(Authentication authentication,
                                             @Valid @PathVariable("mentoring-id") Long mentoringId){
        // 현재 memberid와 mentoring id를 service로 전달
        Long memberId = (Long) authentication.getCredentials();
        mentoringService.remove(memberId,mentoringId);
        return new ResponseEntity<>("멘토링이 삭제되었습니다.", HttpStatus.OK);
    }
}
