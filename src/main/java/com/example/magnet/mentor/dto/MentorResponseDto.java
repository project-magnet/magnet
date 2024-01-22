package com.example.magnet.mentor.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
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

    @Getter
    @Builder(toBuilder = true)
    public static class MentoringDto {
        private Long id;
        private String title;
        private String content;
        private String pay;
        private String period;
        private int participants;
        private String category;

    }

}
