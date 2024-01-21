package com.example.magnet.mentor.dto;

import lombok.*;

@Builder
public class MentorResponseDto {
    private Long mentorId;
    private String mentorName;

    private String career; // 경력
    private String field;  // 직무분야
    private String task; // 현직- 기업정보
    private String email; // 연락 이메일
    private String phone; // 연락처
    private String aboutMe;// 자기소개
    private String github; // github 링크


}
