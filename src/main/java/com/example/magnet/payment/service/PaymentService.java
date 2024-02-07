package com.example.magnet.payment.service;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.service.MemberService;
import com.example.magnet.payment.entity.Payment;
import com.example.magnet.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final MemberService memberService;

    public Payment requestTossPayment(Payment payment, Long memberId){
        Member member = memberService.findMyInfo(memberId);
        if(payment.getAmount() < 1000){
            throw new BusinessLogicException(ExceptionCode.INVALID_PAYMENT_AMOUNT);
        }
        payment.toBuilder().member(member);
        return paymentRepository.save(payment);
    }
}
