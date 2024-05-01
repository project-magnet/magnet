package com.example.magnet.mentor.dto;

import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private List<MentoringDto> mentoringDtoList;
//    private List<MentorsMenteeDto> mentorsMenteeDtos;


    @QueryProjection
    @Builder(toBuilder = true)
    public MentorResponseDto(Long mentorId, String mentorName, String career, String field, String task, String email, String phone, String aboutMe, String github, List<MentoringDto> mentoringDtoList) {
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.career = career;
        this.field = field;
        this.task = task;
        this.email = email;
        this.phone = phone;
        this.aboutMe = aboutMe;
        this.github = github;
        this.mentoringDtoList = mentoringDtoList;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class MentoringDto {
        private Long id;
        private String title;
        private String content;
        private String pay;
        private String period;
        private int participants;
        private String category;
//        private List<MentorsMenteeDto> mentorsMenteeDtos;

        @QueryProjection
        @Builder(toBuilder = true)
        public MentoringDto(Long id, String title, String content, String pay, String period, int participants, String category) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.pay = pay;
            this.period = period;
            this.participants = participants;
            this.category = category;
        }
    }
}
