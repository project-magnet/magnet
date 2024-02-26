package com.example.magnet.payment.dto;

import com.example.magnet.payment.entity.Payment;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

import java.util.UUID;

@Getter
@Builder
public class PaymentDto {
    @NonNull
    private PayType payType;
    @NonNull
    private Long amount;
    @NonNull
    private String orderName;

    private String yourSuccessUrl;
    private String yourFailUrl;

    /**
     *  memberId와 nickName은 createMentee 호출 시 authentication으로 db에 저장
     * */
    private Long mentoringId;
    private String message;
    private String schedule;
    private String phone;

    public Payment toEntity() {
        return Payment.builder()
                .payType(payType)
                .amount(amount)
                .orderName(orderName)
                .orderId(UUID.randomUUID().toString())
                .paySuccessYN(false)
                .build();
    }
}
