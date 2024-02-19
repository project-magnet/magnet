package com.example.magnet.mentee.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenteePostDto {
    private String message;
    private String schedule;
}
