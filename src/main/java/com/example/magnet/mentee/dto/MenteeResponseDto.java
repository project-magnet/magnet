package com.example.magnet.mentee.dto;

import com.example.magnet.mentoring.entity.Mentoring;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class MenteeResponseDto {
    private Long menteeId;
    private Long memberId; // mentee의 memberId
    private String message;
    private String schedule;
    private String paymentKey;
    private String email;

    private Long mentoringId;
    private String title;
    private String content;
    private String pay;
    private int participants;
    private String category;

    private String mentorName;


}
