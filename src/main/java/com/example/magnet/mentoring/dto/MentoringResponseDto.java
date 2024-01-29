package com.example.magnet.mentoring.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MentoringResponseDto {
    private Long mentoringId;
    private String title;
    private String content;
    private String pay;
    private String period; // 전체 기간
    private int participants;
    private String category;

    private Long mentorId;
    private String career; // 경력
    private String field;  // 직무분야 = category
    private String task; // 현직- 기업정보
    private String email; // 연락 이메일
    private String phone; // 연락처
    private String aboutMe;// 자기소개
    private String github; // github 링크
}
