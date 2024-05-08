package com.example.magnet.payment.mapper;

import com.example.magnet.payment.dto.ChargingHistoryDto;
import com.example.magnet.payment.dto.PaymentResponseDtoV2;
import com.example.magnet.payment.entity.Payment;
import lombok.RequiredArgsConstructor;

import java.util.*;

@RequiredArgsConstructor
public class PaymentMapper {

    public static List<ChargingHistoryDto> chargingHistoryToChargingHistoryResponses(List<Payment> chargingHistories) {
        if (chargingHistories == null) {
            return null;
        }

        return chargingHistories.stream()
                .map(chargingHistory -> {
                    return ChargingHistoryDto.builder()
                            .paymentHistoryId(chargingHistory.getId())
                            .amount(chargingHistory.getAmount())
                            .orderName(chargingHistory.getOrderName())
                            .createdAt(chargingHistory.getCreatedDate())
                            .isPaySuccessYN(chargingHistory.isPaySuccessYN())
                            .build();
                }).toList();
    }

    public static PaymentResponseDtoV2 PaymentToPaymentDto(Payment payment){
        return PaymentResponseDtoV2.builder()
                .payType(payment.getPayType().toString())
                .orderName(payment.getOrderName())
                .amount(payment.getAmount())
                .orderId(payment.getOrderId())
                .cancelYN(payment.isCancelYN())
                .cancelReason(payment.getCancelReason())
                .createdAt(payment.getCreatedDate().toString())
                .paymentKey(payment.getPaymentKey())
                .build();
    }
}
