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
@Validated
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity<String> signupMember(@Valid @RequestBody MemberPostDto memberPostDto){
        memberService.createMember(mapper.postDtoToEntity(memberPostDto));
        return new ResponseEntity<>("정상적으로 가입되었습니다.",HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(){
        // 로그아웃 로직 수행
        // Redis에서 사용자 정보 및 토큰 정보 삭제
        return new ResponseEntity<>("로그아웃 되었습니다.", HttpStatus.OK);
    }


}
