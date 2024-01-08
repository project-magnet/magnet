package com.example.magnet.member.dto;

import jakarta.annotation.Nonnull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberPatchDto {
    private String email;
    private String password;
    private String nickName;

    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$", message ="010으로 시작하고 '-'로 구분됩니다." )
    private String phone;

    @Valid // 내장타입 검증
    private MemberPostDto.AddressDto addressDto;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AddressDto {
        @Nonnull
        private String city;
        @Nonnull
        private String street;
    }


}
