package com.example.magnet.mentor.controller;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.mapper.MentorMapper;
import com.example.magnet.mentor.service.MentorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mentor")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MentorController {
    private final MentorService mentorService;
    private final MentorMapper mapper;

    // 멘토 등록
    @PostMapping("/create")
    public ResponseEntity<?> register(@Valid @RequestBody MentorPostDto mentorPostDto, Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // 멘티 권한이 있다면 멘토로 등록할 수 없다.
        if(roles.contains("MENTEE")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BusinessLogicException(ExceptionCode.MENTEE_CANT_REGISTER_MENTOR));
        }else{
            Mentor mentor = mapper.MentorPostDtoToMentor(mentorPostDto);
            mentorService.createMentor(memberId, mentor);
        }

        return new ResponseEntity<>("멘토 등록이 완료되었습니다.", HttpStatus.CREATED);

    }

    // 멘토 조회
}
