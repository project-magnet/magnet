package com.example.magnet.member.dto;

import jakarta.annotation.Nonnull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Nonnull은 jakarta로
 * */
@Getter
@NoArgsConstructor
public class MemberPostDto {  // 회원 등록 dto

    @NotBlank
//    @Email
    private String email;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank(message = "이름을 작성해주세요.")
    private String nickName;

//    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$", message ="010으로 시작하고 '-'로 구분됩니다." )
    private String phone;

    private String picture;

    @Valid // 내장타입 검증
    private AddressDto addressDto;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AddressDto {
        private String city;
        private String street;
    }

    @Builder
    public MemberPostDto(String email, String username, String password, String nickName, String phone, String picture, AddressDto addressDto) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.nickName = nickName;
        this.phone = phone;
        this.picture = picture;
        this.addressDto = addressDto;
    }
}
