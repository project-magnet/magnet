package com.example.magnet.mentee.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class MenteePostDto {
    private String message;
    private String schedule;
    private String phone;

    @NotBlank
    private String email;

    @NotNull // notblank는 문자열만 가능
    private Long mentoringId; //mentoringTitle?

    @NotBlank
    private String paymentKey;
}
