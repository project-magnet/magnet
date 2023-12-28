package com.example.magnet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class MemberResponseDto {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String picture;
    private AddressDto addressDto;

}
