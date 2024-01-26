package com.example.magnet.mentoring.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MentoringPostDto {
    private String title;
    private String content;
    private String pay;
    private String period;
    private int participants;
    private String category;

}
