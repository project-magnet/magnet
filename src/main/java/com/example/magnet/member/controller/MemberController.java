package com.example.magnet.member.controller;

import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.mapper.MemberMapper;
import com.example.magnet.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@Validated
@Slf4j
@RequiredArgsConstructor
//@ControllerAdvice // 모든 요청에 대해 spring security 필터 적용
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity<?> signupMember(@Valid @RequestBody MemberPostDto memberPostDto){
        memberService.createMember(mapper.postDtoToEntity(memberPostDto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
