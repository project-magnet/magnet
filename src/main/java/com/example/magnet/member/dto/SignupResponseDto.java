package com.example.magnet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupResponseDto {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String picture;
    private AddressDto addressDto;

}
