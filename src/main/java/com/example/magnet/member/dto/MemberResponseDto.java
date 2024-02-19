package com.example.magnet.member.dto;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder(toBuilder = true)
public class MemberResponseDto {
    private Long id;
    private String username;
    private String nickName;
    private String email;
//    private String password;  // 복호화 여부 프론트랑 상의
    private String phone;
    private String memberStatus;
    private String city;
    private String street;
    private List<String> roles;

    private Long point;


}
