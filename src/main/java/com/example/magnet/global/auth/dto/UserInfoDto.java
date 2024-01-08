package com.example.magnet.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Component
public class UserInfoDto {
    private Long memberId;
    private String username;
    private List<String> roles;


    public void setUserInfoDto(UserInfoDto userInfoDto) {
        this.memberId = userInfoDto.memberId;
        this.username = userInfoDto.username;
        this.roles = userInfoDto.roles;
    }

}
