package com.example.magnet.mentoring.controller;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.global.response.RestPage;
import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.dto.mentoringListPagingDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.mapper.MentoringMapper;
import com.example.magnet.mentoring.service.MentoringService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Mentoring Controller",description = "멘토링 API")
public class MentoringController {
    private final MentoringService mentoringService;

    @PostMapping("/create")
    @Operation(summary ="Mentoring Registration", description = "멘토링 등록 API")
    @ApiResponse(responseCode = "200", description = "멘토링이 개설되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<?> registerMentoring(@Valid @RequestBody MentoringPostDto mentoringPostDto, Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        List<String> roles = authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();

        if(!roles.contains("ROLE_MENTOR")){
            throw new BusinessLogicException(ExceptionCode.MISSING_MENTOR_ROLE);
        }

        mentoringService.register(memberId, mentoringPostDto);
        return ResponseEntity.ok()
                .body("멘토링이 개설되었습니다.");

    }

    @GetMapping("/get/{mentoring-id}")
    @Operation(summary ="Get Mentoring", description = "멘토링 단건 조회 API")
    @ApiResponse(responseCode = "200", description = "멘토링 단건조회 성공.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<MentoringResponseDto> getMentoring(@Valid @PathVariable("mentoring-id") Long mentoringId){
        return ResponseEntity.ok()
                .body(mentoringService.mentoringInfo(mentoringId));
    }


    // 멘토링 전체 리스트 조회
    @GetMapping("/list")
    @Operation(summary ="Get Mentorings", description = "멘토링 리스트 조회 API")
    @ApiResponse(responseCode = "200", description = "멘토링 리스트 조회 성공.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<?> getMentoringList(Pageable pageable){
        Page<mentoringListPagingDto> result = mentoringService.mentoringInfoList(pageable.getPageNumber(), pageable.getPageSize());
        log.info("페이징 객체", result);
//        return ResponseEntity.ok()
//                .body(new RestPage<>(result));
        return new ResponseEntity<>(new RestPage<>(result), HttpStatus.OK);
    }


    // 멘토링 리스트 필터링

    // 멘토링 수정

    // 멘토링 삭제
    @DeleteMapping("/remove/{mentoring-id}")
    @Operation(summary ="Delete Mentoring", description = "멘토링 삭제 API")
    @ApiResponse(responseCode = "200", description = "멘토링이 삭제되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<String> deleteMentoring(Authentication authentication,
                                             @Valid @PathVariable("mentoring-id") Long mentoringId){
        // 현재 memberid와 mentoring id를 service로 전달
        Long memberId = (Long) authentication.getCredentials();
        mentoringService.remove(memberId,mentoringId);
        return ResponseEntity.ok()
                .body("멘토링이 삭제되었습니다.");
    }
}
