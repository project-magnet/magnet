package com.example.magnet.mentor.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MentorsMenteeDto {
    private Long menteeId;
    private String menteeNickName;
    private String phone;
    private String email;


    @QueryProjection
    @Builder(toBuilder = true)
    public MentorsMenteeDto(Long menteeId, String menteeNickName, String phone, String email) {
        this.menteeId = menteeId;
        this.menteeNickName = menteeNickName;
        this.phone = phone;
        this.email = email;
    }
}
