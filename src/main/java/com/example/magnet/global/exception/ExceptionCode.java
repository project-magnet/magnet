package com.example.magnet.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum ExceptionCode {

    // member
    MEMBER_NOT_FOUND(404, "사용자를 찾을 수 없습니다."),

    MEMBER_EXISTS(409, "이미 사용자가 존재합니다.");

    // mentor

    //mentee


    @Getter
    private final int status;

    @Getter
    private final String message;


}
