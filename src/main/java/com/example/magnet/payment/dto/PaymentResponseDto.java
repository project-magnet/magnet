package com.example.magnet.payment.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * PaymentDto로 받은 정보들을 검증 후, 실제 토스페이먼츠에서 결제 요청을 하기 위해 필요한 값들을 포함하여 반환하는 dto
 * */
@Getter
@Builder(toBuilder = true)
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentResponseDto {
    private String payType; // 결제 타입 - 카드/현금/포인트
    private Long amount; // 가격 정보
    private String orderName; // 주문명
    private String orderId; // 주문id
    private String customerEmail; // 고객 이메일
    private String customerName; // 고객 이름
    private String successUrl; // 성공시 리다이렉트 url
    private String failUrl; // 실패 시 리다이렉트 url

    private String failReason; // 실패 이유
    private boolean cancelYN; // 취소 여부
    private String cancelReason; // 취소 이유
    private String createdAt; // 결제가 이루어진 시간

//    @Builder(toBuilder = true)
//    public PaymentResponseDto(String payType, Long amount, String orderName, String orderId, String customerEmail, String customerName, String successUrl, String failUrl, String failReason, boolean cancelYN, String cancelReason, String createdAt) {
//        this.payType = payType;
//        this.amount = amount;
//        this.orderName = orderName;
//        this.orderId = orderId;
//        this.customerEmail = customerEmail;
//        this.customerName = customerName;
//        this.successUrl = successUrl;
//        this.failUrl = failUrl;
//        this.failReason = failReason;
//        this.cancelYN = cancelYN;
//        this.cancelReason = cancelReason;
//        this.createdAt = createdAt;
//    }
}
