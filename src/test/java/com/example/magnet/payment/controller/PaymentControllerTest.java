package com.example.magnet.payment.controller;

import com.example.magnet.global.config.TossPaymentConfig;
import com.example.magnet.member.entity.Member;
import com.example.magnet.payment.dto.PayType;
import com.example.magnet.payment.dto.PaymentDto;
import com.example.magnet.payment.dto.PaymentResponseDto;
import com.example.magnet.payment.entity.Payment;
import com.example.magnet.payment.service.PaymentService;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;


@WebMvcTest(PaymentController.class)
class PaymentControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private Gson gson;
    private final String BASE_URL = "/api/vq/payments";

    @Autowired
    PasswordEncoder passwordEncoder;

    @MockBean
    private PaymentService paymentService;

    @MockBean
    private TossPaymentConfig tossPaymentConfig;

    private Member member;

    @BeforeEach
    public void setUp(){
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        Member member = Member.builder()
                .id(1L)
                .email("testUser@gmail.com")
                .password(passwordEncoder.encode("password"))
                .username("testUser")
                .point(100L)
                .deleted(false)
                .roles(roles)
                .build();
    }

    @Test
    @DisplayName("결제 요청 테스트")
    @WithMockUser(username = "testUser", roles = "USER")
    void requestTossPayment() throws Exception{
        //given - dto 생성, credential 생성,
        PaymentDto paymentDto = PaymentDto.builder()
                .payType(PayType.CARD)
                .amount(20000L)
                .orderName("일반 카드결제")
                .yourSuccessUrl("http://localhost:3000/payment/success")
                .yourFailUrl("http://localhost:3000/payment/fail")
                .build();
        Payment paymentResDto = Payment.builder()
                .payType(PayType.CARD)
                .amount(20000L)
                .orderName("일반 카드결제")
                .orderId("1")
                .id(1L)
                .cancelReason("취소 사유")
                .cancelYN(true)
                .failReason("실패 사유")
                .member(member)
                .build();
        given(paymentService.requestTossPayment(any(), any())).willReturn(paymentResDto);
        given(tossPaymentConfig.getFailUrl()).willReturn("http://localhost:8080/api/v1/payments/toss/fail");
        given(tossPaymentConfig.getSuccessUrl()).willReturn("http://localhost:8080/api/v1/payments/toss/success");
        //when

    }




}