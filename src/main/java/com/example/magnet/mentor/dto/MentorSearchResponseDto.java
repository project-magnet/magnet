package com.example.magnet.mentor.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

/**
 * Mentor search 전용 dto. mentor가 생성한 mentoring까지 같이 조회하는 용도
 * */
@Getter
@Builder
public class MentorSearchResponseDto {
    private Long mentorId;
    private String mentorName;

    private String career; // 경력
    private String field;  // 직무분야
    private String task; // 현직- 기업정보
    private String email; // 연락 이메일
    private String phone; // 연락처
    private String aboutMe;// 자기소개
    private String github; // github 링크

    private Long mentoringId;
    private String mentoringTitle;
    private String mentoringContent;
    private String mentoringPay;
    private String mentoringPeriod;
    private int mentoringParticipants;
    private String mentoringCategory;

    @QueryProjection
    public MentorSearchResponseDto(Long mentorId, String mentorName, String career, String field, String task, String email, String phone, String aboutMe, String github, Long mentoringId, String mentoringTitle, String mentoringContent, String mentoringPay, String mentoringPeriod, int mentoringParticipants, String mentoringCategory) {
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.career = career;
        this.field = field;
        this.task = task;
        this.email = email;
        this.phone = phone;
        this.aboutMe = aboutMe;
        this.github = github;
        this.mentoringId = mentoringId;
        this.mentoringTitle = mentoringTitle;
        this.mentoringContent = mentoringContent;
        this.mentoringPay = mentoringPay;
        this.mentoringPeriod = mentoringPeriod;
        this.mentoringParticipants = mentoringParticipants;
        this.mentoringCategory = mentoringCategory;
    }
}
