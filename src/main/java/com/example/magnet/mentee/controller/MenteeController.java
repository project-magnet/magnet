package com.example.magnet.mentee.controller;

import com.example.magnet.mentee.service.MenteeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mentee")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MenteeController {
    private final MenteeService menteeService;

    // 멘티 등록
//    @PostMapping("/create")
//    public ResponseEntity<?> createMentee(@Valid @RequestBody MenteePostDto menteePostDto){
//        // 결제 완료 검증
//        //
//    }
}
