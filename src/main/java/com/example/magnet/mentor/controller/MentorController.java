package com.example.magnet.mentor.controller;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDtoV2;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.service.MentorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.magnet.mentor.mapper.MentorMapper.*;

@RestController
@RequestMapping("/mentor")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MentorController {
    private final MentorService mentorService;

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
            mentorService.createMentor(roles, memberId, mentorPostDto);
        }

        return new ResponseEntity<>("멘토 등록이 완료되었습니다.", HttpStatus.CREATED);

    }

    // 자신의 멘토 정보 조회
    @GetMapping("/get")
    public ResponseEntity<MentorResponseDto> getMentor(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        return new ResponseEntity<>(mentorService.getMentor(memberId), HttpStatus.FOUND);
    }


    //멘토 리스트 조회
    @GetMapping("/list")
    public ResponseEntity<Page<MentorSearchResponseDtoV2>> getMentorList(@RequestParam("offset") int offset,
                                                                         @RequestParam("size") int size){ // pageableDefault 적용 ?
        return new ResponseEntity<>(mentorService.search(offset, size), HttpStatus.OK);
    }

    //멘토 삭제
    @DeleteMapping("/remove")
    public ResponseEntity<?> deleteMentor(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        if(roles.contains("MENTOR")||roles.contains("ADMIN")){
            mentorService.remove(memberId);
            return new ResponseEntity<>("등록한 멘토정보를 삭제했습니다.", HttpStatus.OK);
        }else{
            return new ResponseEntity<>(ResponseEntity.badRequest(),HttpStatus.UNAUTHORIZED);
        }

    }

}
