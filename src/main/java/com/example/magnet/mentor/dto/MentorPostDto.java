package com.example.magnet.mentor.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MentorPostDto {

    @NotBlank
    private String mentorName;

    @NotBlank
    private String field; // 직무분야

    @NotBlank
    private String career; // 경력

    @NotBlank
    private String task; // 현직 - 기업정보

    @NotBlank
    private String email; // 연락 이메일

    @NotBlank
    private String phone; // 연락처

    @NotBlank
    private String aboutMe;// 자기소개

    @NotBlank
    private String github; // github 링크


    @Builder(toBuilder = true)
    public MentorPostDto(String mentorName, String field, String career, String task, String email, String phone, String aboutMe, String github) {

        this.mentorName = mentorName;
        this.field = field;
        this.career = career;
        this.task = task;
        this.email = email;
        this.phone = phone;
        this.aboutMe = aboutMe;
        this.github = github;
    }
}
