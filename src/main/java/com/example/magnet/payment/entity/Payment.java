package com.example.magnet.payment.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.payment.dto.PayType;
import com.example.magnet.payment.dto.PaymentResponseDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Table(indexes = {  // reference
//        @Index(name = "idx_payment_member", columnList = "member"),
//        @Index(name = "idx_payment_paymentKey", columnList = "paymentKey"),
//})
public class Payment extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAYMENT_ID", nullable = false, unique = true)
    private Long id;

    @Column(nullable = false, name = "pay_type")
    @Enumerated(EnumType.STRING)
    private PayType payType;

    @Column(nullable = false, name = "pay_amount")
    private Long amount;

    @Column(nullable = false, name = "pay_name")
    private String orderName; // 결제 종류

    @Column(nullable = false, name = "order_id")
    private String orderId;

    private boolean paySuccessYN;

    @Column
    private String paymentKey;

    @Column
    private String failReason;

    @Column
    private boolean cancelYN;

    @Column
    private String cancelReason;

    @Column
    private Long mentoringId;



    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST) // fetch = FetchType.LAZY
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENTEE_ID")
    private Mentee mentee;

    @Builder(toBuilder = true)
    public Payment(Long id, PayType payType, Long amount, String orderName, String orderId, boolean paySuccessYN, String paymentKey, String failReason, boolean cancelYN, String cancelReason, Member member, Mentee mentee, Long mentoringId) {
        this.id = id;
        this.payType = payType;
        this.amount = amount;
        this.orderName = orderName;
        this.orderId = orderId;
        this.paySuccessYN = paySuccessYN;
        this.paymentKey = paymentKey;
        this.failReason = failReason;
        this.cancelYN = cancelYN;
        this.cancelReason = cancelReason;
        this.member = member;
        this.mentee = mentee;
        this.mentoringId = mentoringId;
    }

    public PaymentResponseDto toPaymentResDto() {
        return PaymentResponseDto.builder()
                .payType(payType.getDescription())
                .amount(amount)
                .orderName(orderName)
                .orderId(orderId)
                .customerEmail(member.getEmail())
                .customerName(member.getName())
                .createdAt(String.valueOf(getCreatedDate()))
                .cancelYN(cancelYN)
                .failReason(failReason)
                .build();
    }
}
