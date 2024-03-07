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
    MENTOR_EXISTS(400, "멘토권한이 이미 존재합니다."),

    //MENTORING
    MENTORING_NOT_FOUND(404, "멘토링 정보를 찾을 수 없습니다."),


    //mentee
    MENTEE_EXISTS(400, "멘티권한이 존재합니다."),
    MENTEE_NOT_FOUND(404, "멘티 정보를 찾을 수 없습니다."),

    //PAYMENT
    INVALID_PAYMENT_AMOUNT(400, "잘못된 금액입니다."),
    PAYMENT_NOT_FOUND(404, "결제 정보를 찾을 수 없습니다."),
    PAYMENT_AMOUNT_EXP(400, "매개변수로 전달 받은 AMOUNT가 DB에 저장된 값과 불일치"),
    ALREADY_APPROVED(400, "이미 승인이 완료됐습니다."),
    ALREADY_PAID_OR_ONGOING(400, "결제가 완료됐거나 진행중입니다."),
    PAYMENT_NOT_ENOUGH_POINT(400, "포인트가 부족합니다."),


    // role
    MISSING_MENTOR_ROLE(403, "멘토 권한이 필요합니다."),
    MISSING_MENTEE_ROLE(403, "멘티 권한이 필요합니다."),
    MISSING_USER_ROLE(403, "사용자 권한이 필요합니다."),
    MISSING_ADMIN_ROLE(403, "관리자 권한이 필요합니다.");


    @Getter
    private final int status;

    @Getter
    private final String message;


}
