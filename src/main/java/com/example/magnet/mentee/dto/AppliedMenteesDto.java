package com.example.magnet.mentee.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AppliedMenteesDto {
    private Long menteeId;
    private String menteeNickName;
    private String schedule;
//    private String phone;
    private String email;

    @Builder(toBuilder = true)
    @QueryProjection
    public AppliedMenteesDto(Long menteeId, String menteeNickName, String schedule, String email) {
        this.menteeId = menteeId;
        this.menteeNickName = menteeNickName;
        this.schedule = schedule;
        this.email = email;
    }
}
