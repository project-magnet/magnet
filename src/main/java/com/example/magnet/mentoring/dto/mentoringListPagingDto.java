package com.example.magnet.mentoring.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Data
@ToString
@NoArgsConstructor
public class mentoringListPagingDto {

    private Long mentoringId;
    private String title;
    private String content;
    private String pay;
    private String period; // 전체 기간
    private int participants;
    private String category;

    private Long mentorId;
    private String aboutMe;
    private String field;
    private String task;
    private String mentorName;
    private String career;


    @Builder
    @QueryProjection
    public mentoringListPagingDto(Long mentoringId, String title, String content, String pay, String period, int participants, String category, Long mentorId, String aboutMe, String field, String task, String mentorName, String career) {
        this.mentoringId = mentoringId;
        this.title = title;
        this.content = content;
        this.pay = pay;
        this.period = period;
        this.participants = participants;
        this.category = category;
        this.mentorId = mentorId;
        this.aboutMe = aboutMe;
        this.field = field;
        this.task = task;
        this.mentorName = mentorName;
        this.career = career;
    }
}
