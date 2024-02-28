package com.example.magnet.mentee.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class MenteePostDto {
    private String message;
    private String schedule;
    private String phone;

    @NotBlank
    private Long mentoringId; //mentoringTitle?

    @NotBlank
    private String paymentKey;
}
