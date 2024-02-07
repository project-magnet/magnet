package com.example.magnet.payment.controller;

import com.example.magnet.global.config.TossPaymentConfig;
import com.example.magnet.payment.dto.PaymentDto;
import com.example.magnet.payment.dto.PaymentResponseDto;
import com.example.magnet.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payments")
@Validated
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final TossPaymentConfig tossPaymentConfig;
    private final PaymentMapper mapper;

    @PostMapping("/toss")
    public ResponseEntity<PaymentResponseDto> requestTossPayment(@RequestBody @Valid PaymentDto paymentReqDto, Authentication authentication){
        // 검증 과정 진행 후 토스페이먼츠에 실제 결제 요청 전송
//        PaymentResponseDto paymentResDto = paymentService.requestTossPayment(paymentReqDto.toEntity(), principal.getUsername()).toPaymentResDto();
//        paymentResDto.setSuccessUrl(paymentReqDto.getYourSuccessUrl() == null ? tossPaymentConfig.getSuccessUrl() : paymentReqDto.getYourSuccessUrl());
//        paymentResDto.setFailUrl(paymentReqDto.getYourFailUrl() == null ? tossPaymentConfig.getFailUrl() : paymentReqDto.getYourFailUrl());
//        return ResponseEntity.ok().body(new SingleResponse<>(paymentResDto));

        PaymentResponseDto paymentResponseDto = paymentService.requestTossPayment(paymentReqDto, authentication.getCredentials());
        paymentResponseDto.setSuccessUrl(paymentReqDto.getYourSuccessUrl() == null ? tossPaymentConfig.getSuccessUrl() : paymentReqDto.getYourSuccessUrl());
        paymentResponseDto.setFailUrl(paymentReqDto.getYourFailUrl() == null ? tossPaymentConfig.getFailUrl() : paymentReqDto.getYourFailUrl());
        return new ResponseEntity<>(paymentResponseDto, HttpStatus.OK);
    }
}
