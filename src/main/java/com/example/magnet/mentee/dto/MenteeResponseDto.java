package com.example.magnet.mentee.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenteeResponseDto {
    private Long menteeId;
    private Long memberId;
    private Long mentoringId;
    private String message;
    private String schedule;
    private Long paymentId;

}
