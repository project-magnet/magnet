package com.example.magnet.mentoring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentoringPostDto {
    private Long id;
    private String title;
    private String content;
    private String pay;
    private String period;
    private int participants;
    private String category;

}
