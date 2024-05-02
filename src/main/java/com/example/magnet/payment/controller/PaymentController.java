package com.example.magnet.payment.controller;

import com.example.magnet.global.config.TossPaymentConfig;
import com.example.magnet.global.response.SliceInfo;
import com.example.magnet.global.response.SliceResponseDto;
import com.example.magnet.payment.dto.PaymentDto;
import com.example.magnet.payment.dto.PaymentFailDto;
import com.example.magnet.payment.dto.PaymentResponseDto;
import com.example.magnet.payment.dto.PaymentSuccessDto;
import com.example.magnet.payment.entity.Payment;
import com.example.magnet.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.example.magnet.payment.mapper.PaymentMapper.chargingHistoryToChargingHistoryResponses;

/**
 * 검증 과정 진행 후 토스페이먼츠에 실제 결제 요청 전송
 * */

@RestController
@RequestMapping("/api/v1/payments")
@Validated
@RequiredArgsConstructor
@Tag(name = "Payment Controller",description = "결제(toss) API")
public class PaymentController {
    private final PaymentService paymentService;
    private final TossPaymentConfig tossPaymentConfig;

    /**
     * 토스페이먼츠에 실제 결제 요청을 보내기 전 검증 api
     * */
    @PostMapping("/toss")
    @Operation(summary ="Request Toss Payment", description = "결제 요청 API")
    @ApiResponse(responseCode = "200", description = "토스로 결제 요청을 보냈습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<PaymentResponseDto> requestTossPayment(@RequestBody @Valid PaymentDto paymentReqDto, Authentication authentication){
        PaymentResponseDto paymentResponseDto = paymentService.requestTossPayment(paymentReqDto, (Long)authentication.getCredentials()).toPaymentResDto();
        PaymentResponseDto result = paymentResponseDto.toBuilder()
                .successUrl(paymentReqDto.getYourSuccessUrl() == null ? tossPaymentConfig.getSuccessUrl() : paymentReqDto.getYourSuccessUrl())
                .failUrl(paymentReqDto.getYourFailUrl() == null ? tossPaymentConfig.getFailUrl() : paymentReqDto.getYourFailUrl()).build();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    /**
     * 결제요청 성공 시 승인 로직
     * */
    @GetMapping("/toss/success")
    @Operation(summary ="Request for Approval of payment", description = "결제승인 요청 API")
    @ApiResponse(responseCode = "200", description = "토스로 결제승인 요청을 보냈습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<PaymentSuccessDto> tossPaymentSuccess(@RequestParam String paymentKey,
                                                                @RequestParam String orderId,
                                                                @RequestParam Long amount){
        return new ResponseEntity<>(paymentService.tossPaymentSuccess(paymentKey, orderId, amount), HttpStatus.OK);
    }

    /**
     * 결제 실패 로직
     * */
    @GetMapping("/toss/fail")
    @Operation(summary ="Payment failed", description = "결제 실패 API")
    @ApiResponse(responseCode = "200", description = "결제 실패 요청이 정상적으로 실행됐습니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<PaymentFailDto> tossPaymentFail(@RequestParam String code, @RequestParam String message, @RequestParam String orderId) {
        paymentService.tossPaymentFail(code, message, orderId);
        PaymentFailDto result = PaymentFailDto.builder()
                .errorCode(code)
                .errorMessage(message)
                .orderId(orderId)
                .build();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 결제 취소 api
     * - 결제 승인 시 발급받은 paymentKey, cnacelReason 입력
     * - 헤더에 시크릿 키 인코딩 후 반환
     * */

    @PostMapping("/toss/cancel/point")
    @Operation(summary ="Payment Cancel", description = "결제 취소 API")
    @ApiResponse(responseCode = "200", description = "결제 취소요청이 정상적으로 동작합니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity<?> tossPaymentCancel(
            Authentication authentication,
            @RequestParam String paymentKey,
            @RequestParam String cancelReason
    ){
        return new ResponseEntity<>(paymentService.cancelPaymentPoint(authentication.getName(), paymentKey, cancelReason), HttpStatus.OK);
    }

    @GetMapping("/history")
    @Operation(summary ="Get ChargingHistory", description = "결제 충전내역 조회 API")
    @ApiResponse(responseCode = "200", description = "결제 충전내역을 조회합니다.", content = @Content(mediaType = "application/json"))
    public ResponseEntity getChargingHistory(Authentication authentication,
                                             Pageable pageable) {
        Slice<Payment> chargingHistories = paymentService.findAllChargingHistories(authentication.getName(), pageable);
        SliceInfo sliceInfo = new SliceInfo(pageable, chargingHistories.getNumberOfElements(), chargingHistories.hasNext());
        return new ResponseEntity<>(
                new SliceResponseDto<>(chargingHistoryToChargingHistoryResponses(chargingHistories.getContent()), sliceInfo), HttpStatus.OK);
    }

}
