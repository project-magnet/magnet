package com.example.magnet.payment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentResponseDtoV2 {
    private String payType; // 결제 타입 - 카드/현금/포인트
    private Long amount; // 가격 정보
    private String orderName; // 주문명
    private String orderId; // 주문id

    private boolean cancelYN; // 취소 여부
    private String cancelReason; // 취소 이유
    private String createdAt; // 결제가 이루어진 시간
    private String paymentKey;
}
