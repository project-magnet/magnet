package com.example.magnet.payment.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 결제 내역 조회
 * */


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChargingHistoryDto {

    private Long paymentHistoryId;

    @NonNull
    private Long amount; // 가격

    @NonNull
    private String orderName; // 주문명

    private boolean isPaySuccessYN; // 결제 성공여부

    private LocalDateTime createdAt; // 생성시각
}
