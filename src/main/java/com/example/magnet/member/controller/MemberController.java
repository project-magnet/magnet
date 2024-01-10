package com.example.magnet.member.controller;

import com.example.magnet.global.auth.dto.UserInfoDto;
import com.example.magnet.member.dto.ExtractMember;
import com.example.magnet.member.dto.MemberPatchDto;
import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.dto.MemberResponseDto;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.mapper.MemberMapper;
import com.example.magnet.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Validated
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    // return current member
    @GetMapping("/extract")
    public ResponseEntity<ExtractMember> extractMember(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        ExtractMember extractMember = new ExtractMember(memberId, username, roles);

        return ResponseEntity.ok(extractMember);
    }

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

    // 회원 수정
    @PatchMapping("/update")
    public ResponseEntity<Void> memberUpdate(@Valid @RequestBody MemberPatchDto memberPatchDto, Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        memberService.updateMember(mapper.patchDtoToEntity(memberPatchDto, memberId));
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * 회원 단건 조회
     *  - 로그인 한 사용자는 자신의 회원 정보를 조회할 수 있습니다.
     * */
    @GetMapping("/get")
    public ResponseEntity<MemberResponseDto> getMember(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        Member result = memberService.findMyInfo(memberId);

//        return new ResponseEntity<MemberResponseDto>(mapper.memberToResponseDto(result), HttpStatus.OK);
        return null;
    }

    // 회원 리스트 조회


    // 회원 탈퇴

}
