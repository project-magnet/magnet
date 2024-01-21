package com.example.magnet.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum ExceptionCode {

    // member
    MEMBER_NOT_FOUND(404, "사용자를 찾을 수 없습니다."),

    MEMBER_EXISTS(409, "이미 사용자가 존재합니다."),

    // mentor
    MENTEE_CANT_REGISTER_MENTOR(400, "멘티는 멘토등록이 불가능합니다."),
    MENTOR_NOT_FOUND(404, "멘토 정보를 찾을 수 없습니다.");


    //mentee


    @Getter
    private final int status;

    @Getter
    private final String message;


}
