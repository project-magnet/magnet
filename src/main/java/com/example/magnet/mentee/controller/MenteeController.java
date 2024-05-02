package com.example.magnet.mentee.controller;

import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.service.MenteeService;
import com.example.magnet.mentor.dto.MentorsMenteeDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Mentee Controller",description = "멘티 API")
public class MenteeController {
    private final MenteeService menteeService;

    @PostMapping("/create")
    @Operation(summary ="Create mentee", description = "결제가 끝난 회원 멘티등록 API")
    @ApiResponse(responseCode = "200", description = "멘토링 신청이 완료되었습니다.", content = @Content(mediaType = "application/json"))
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
    @Operation(summary ="Get Mentee", description = "멘티 정보 단건조회 API")
    @ApiResponse(responseCode = "200", description = "멘티 정보 단건조회 성공.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<MenteeResponseDto> menteeInfo(@Valid @PathVariable("mentee-id") Long menteeId, Authentication authentication){
        return new ResponseEntity<>(menteeService.getInfo(menteeId, (Long)authentication.getCredentials()),HttpStatus.OK);
    }

    // 회원조회 - 멘토 - 멘토링 - 멘티 리스트 조회
    @GetMapping("/list/{mentoring-id}")
    @Operation(summary ="Get Mentees", description = "멘토링을 신청한 멘티 리스트 조회 API")
    @ApiResponse(responseCode = "200", description = "멘티 정보 리스트 조회 성공", content = @Content(mediaType = "application/json"))
    public ResponseEntity<List<AppliedMenteesDto>> mentees(@Valid @PathVariable("mentoring-id") Long mentoringId){
        return new ResponseEntity<>(menteeService.getAppliedMentees(mentoringId), HttpStatus.OK);
    }
}
