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
    MENTOR_NOT_FOUND(404, "멘토 정보를 찾을 수 없습니다."),


    //mentee

    //PAYMENT
    INVALID_PAYMENT_AMOUNT(404, "잘못된 금액입니다."),
    PAYMENT_NOT_FOUND(404, "결제 정보를 찾을 수 없습니다."),
    PAYMENT_AMOUNT_EXP(404, "매개변수로 전달 받은 AMOUNT가 DB에 저장된 값과 불일치"),
    ALREADY_APPROVED(404, "이미 승인이 완료됐습니다."),
    PAYMENT_NOT_ENOUGH_POINT(404, "포인트가 부족합니다.");


    @Getter
    private final int status;

    @Getter
    private final String message;


}
