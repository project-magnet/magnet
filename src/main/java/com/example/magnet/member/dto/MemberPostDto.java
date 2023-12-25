package com.example.magnet.member.dto;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
/**
 * Nonnull은 jakarta로
 * */
@Getter
@Builder
@AllArgsConstructor
public class MemberPostDto {  // 회원 등록 dto

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank(message = "이름을 작성해주세요.")
    private String name;

    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$", message ="010으로 시작하고 '-'로 구분됩니다." )
    private String phone;
}
