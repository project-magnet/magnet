package com.example.magnet.member.controller;

import com.example.magnet.member.dto.ExtractMember;
import com.example.magnet.member.dto.MemberPatchDto;
import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.dto.MemberResponseDto;
import com.example.magnet.member.mapper.MemberMapper;
import com.example.magnet.member.service.MemberService;
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
@Validated
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member")
@Tag(name = "Member Controller",description = "회원 API")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;


    @GetMapping("/extract")
    @Operation(summary ="Current Member's Credential", description = "현재 Authentication 추출 확인용 API")
    public ResponseEntity<ExtractMember> extractMember(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        ExtractMember extractMember = new ExtractMember(memberId, username, roles);

        return ResponseEntity.ok(extractMember);
    }

    @PostMapping("/signup")
    @Operation(summary ="Signup", description = "회원가입 API")
    @ApiResponse(responseCode = "200", description = "정상적으로 가입되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<String> signupMember(@Valid @RequestBody MemberPostDto memberPostDto){
        memberService.createMember(mapper.postDtoToEntity(memberPostDto));
        return ResponseEntity.ok()
                .body("정상적으로 가입되었습니다.");

    }

    @GetMapping("/logout")
    @Operation(summary ="Logout", description = "로그아웃 API")
    @ApiResponse(responseCode = "200", description = "로그아웃 되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<String> logout(){
        // 로그아웃 로직 수행
        // Redis에서 사용자 정보 및 토큰 정보 삭제
        return ResponseEntity.ok()
                .body("로그아웃 되었습니다.");
    } 


    @PatchMapping("/update")
    @Operation(summary ="Update Member", description = "회원수정 API")
    @ApiResponse(responseCode = "200", description = "회원 정보가 정상적으로 수정되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<String> memberUpdate(@Valid @RequestBody MemberPatchDto memberPatchDto, Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        memberService.updateMember(mapper.patchDtoToEntity(memberPatchDto, memberId));
        return ResponseEntity.ok()
                .body("회원 정보가 정상적으로 수정되었습니다.");
    }



    @GetMapping("/get")
    @Operation(summary ="Get Member", description = "회원 정보 단건 조회 API")
    @ApiResponse(responseCode = "200", description = "회원정보 단건 조회 성공.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<MemberResponseDto> getMember(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        log.info("지금 회원 id: {}", memberId);
        return ResponseEntity.ok()
                .body(memberService.findMyInfo(memberId));
    }





    @DeleteMapping("/delete")
    @Operation(summary ="softDelete Member", description = "회원삭제 API")
    @ApiResponse(responseCode = "200", description = "회원이 정상적으로 삭제되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<String> memberDelete(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        memberService.deleteMember(memberId);
        return ResponseEntity.ok()
                .body("회원이 정상적으로 삭제되었습니다.");
    }
}
