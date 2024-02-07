package com.example.magnet.payment.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * PaymentDto로 받은 정보들을 검증 후, 실제 토스페이먼츠에서 결제 요청을 하기 위해 필요한 값들을 포함하여 반환하는 dto
 * */
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentResponseDto {
    private String payType;
    private Long amount;
    private String orderName;
    private String orderId;
    private String customerEmail;
    private String customerName;
    private String successUrl;
    private String failUrl;

    private String failReason;
    private boolean cancelYN;
    private String cancelReason;
    private String createdAt;

    @Builder
    public PaymentResponseDto(String payType, Long amount, String orderName, String orderId, String customerEmail, String customerName, String successUrl, String failUrl, String failReason, boolean cancelYN, String cancelReason, String createdAt) {
        this.payType = payType;
        this.amount = amount;
        this.orderName = orderName;
        this.orderId = orderId;
        this.customerEmail = customerEmail;
        this.customerName = customerName;
        this.successUrl = successUrl;
        this.failUrl = failUrl;
        this.failReason = failReason;
        this.cancelYN = cancelYN;
        this.cancelReason = cancelReason;
        this.createdAt = createdAt;
    }
}
