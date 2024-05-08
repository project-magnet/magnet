package com.example.magnet.mentor.controller;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDtoV2;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.service.MentorService;
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
@Tag(name = "Mentor Controller",description = "멘토 API")
public class MentorController {
    private final MentorService mentorService;


    @PostMapping("/create")
    @Operation(summary ="Mentor Registration", description = "멘토 등록 API")
    @ApiResponse(responseCode = "200", description = "멘토 등록이 완료되었습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<?> register(@Valid @RequestBody MentorPostDto mentorPostDto, Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        mentorService.createMentor(roles, memberId, mentorPostDto);
        return ResponseEntity.status(201)
                .body("멘토 등록이 완료되었습니다.");
    }

    @GetMapping("/get")
    @Operation(summary ="Get Mentor", description = "멘토 단건 조회 API")
    @ApiResponse(responseCode = "200", description = "멘토 단건조회 성공.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<MentorResponseDto> getMentor(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        return ResponseEntity.ok()
                .body(mentorService.getMentor(memberId));
    }


    @GetMapping("/list")
    @Operation(summary ="Get Mentors", description = "멘토 리스트 조회 API")
    @ApiResponse(responseCode = "200", description = "멘토 리스트 조회 성공", content = @Content(mediaType = "application/json"))
    public ResponseEntity<Page<MentorSearchResponseDtoV2>> getMentorList(@RequestParam("offset") int offset,
                                                                         @RequestParam("size") int size){ // pageableDefault 적용 ?
        return ResponseEntity.ok()
                .body(mentorService.search(offset, size));
    }

    @DeleteMapping("/remove")
    @Operation(summary ="Delete Mentor", description = "멘토 삭제 API")
    @ApiResponse(responseCode = "200", description = "등록한 멘토정보를 삭제했습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<?> deleteMentor(Authentication authentication){
        Long memberId = (Long) authentication.getCredentials();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        if(roles.contains("MENTOR")||roles.contains("ADMIN")){
            mentorService.remove(memberId);
            return ResponseEntity.ok().body("등록한 멘토정보를 삭제했습니다.");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ResponseEntity.badRequest());
        }

    }

}
