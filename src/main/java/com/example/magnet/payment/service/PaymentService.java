package com.example.magnet.payment.service;

import com.example.magnet.global.config.TossPaymentConfig;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.service.MemberService;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.payment.dto.PaymentDto;
import com.example.magnet.payment.dto.PaymentSuccessDto;
import com.example.magnet.payment.entity.Payment;
import com.example.magnet.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.Map;

@Service
@Transactional(rollbackFor={Exception.class})
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final MemberService memberService;
    private final TossPaymentConfig tossPaymentConfig;


    /**
     * 결제 조회
     * */

    /**
     * 사용자의 존재 확인 후 검증 로직 진행. 그 후 해당 결제 객체를 DB에 저장
     * */
    @Transactional
    public Payment requestTossPayment(PaymentDto paymentReqDto, Long memberId){

        Payment payment = paymentReqDto.toEntity();
        Member member = memberService.findMemberById(memberId);
        // 금액이 음수거나, payment 테이블에 해당 정보가 이미 저장된 경우 예외처리
        if(payment.getAmount() < 0){
            throw new BusinessLogicException(ExceptionCode.INVALID_PAYMENT_AMOUNT);
        }
        // 중복 결제 확인
        if(alreadyPaid(payment.getMentoringId(), memberId)){
            throw new BusinessLogicException(ExceptionCode.ALREADY_PAID_OR_ONGOING);
        }
        Payment result = payment.toBuilder().member(member).mentoringId(paymentReqDto.getMentoringId()).build();
        return paymentRepository.save(result);
    }

    @Transactional
    public PaymentSuccessDto tossPaymentSuccess(String paymentKey, String orderId, Long amount) {
        Payment payment = verifyPayment(orderId, amount); // 결제 정보 검증
        PaymentSuccessDto result = requestPaymentAccept(paymentKey, orderId, amount); // successDto 생성

        Payment updatedPayment = payment.toBuilder()
                .paymentKey(paymentKey).paySuccessYN(true)
                .member(payment.getMember().toBuilder()
                        .point(payment.getMember().getPoint()+ amount).build())
                .build();
        paymentRepository.save(updatedPayment);
//        memberService.updateMemberCache(payment.getMember());
        return result;
    }

    public Payment verifyPayment(String orderId, Long amount){
        Payment payment = paymentRepository.findByOrderId(orderId) // 실제로 주문 정보가 DB에 저장되어있는지 확인
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
        if(!payment.getAmount().equals(amount)){ // 결제 금액 일치여부 확인
            throw new BusinessLogicException(ExceptionCode.PAYMENT_AMOUNT_EXP);
        }
        return payment;
    }

    /**
     * paymentkey 존재 여부 확인 - 최종 멘티 등록 시 사용
     * */
    public Boolean beforePaidMentoring(String paymentKey){
        Payment payment = paymentRepository.findByPaymentKey(paymentKey) // 실제로 주문 정보가 DB에 저장되어있는지 확인
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
        return payment != null;
    }

    /**
     * 결제 승인 후 멘티 등록 시 payment가 mentee 정보를 추적하기 위해 작성
     * */
    public void paidMenteeForChecking(Mentee mentee){
        Payment finishedPayment = paymentRepository.findByPaymentKey(mentee.getPaymentKey())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
        Payment payment = finishedPayment.toBuilder().mentee(mentee).build();
        paymentRepository.save(payment);
    }

    /**
     * 중복 결제 여부 확인
     * payment 테이블에 mentoringId와 memberId의 존재 여부 판단
     * */
    private Boolean alreadyPaid(Long mentoringId, Long memberId){
        return paymentRepository.existsByMentoringIdAndMemberId(mentoringId, memberId);
    }


    @Transactional
    public PaymentSuccessDto requestPaymentAccept(String paymentKey, String orderId, Long amount){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = getHeaders();
        JSONObject params = new JSONObject();//키/값 쌍을 문자열이 아닌 오브젝트로 보낼 수 있음
        params.put("orderId", orderId);
        params.put("amount", amount);

        PaymentSuccessDto result = null;

        try { //post요청 (url , HTTP객체 ,응답 Dto)
            result = restTemplate.postForObject(TossPaymentConfig.URL + paymentKey,
                    new HttpEntity<>(params, headers),
                    PaymentSuccessDto.class);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_APPROVED);
        }

        return result;
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String encodedAuthKey = new String(
                Base64.getEncoder().encode((tossPaymentConfig.getTestSecretKey() + ":").getBytes(StandardCharsets.UTF_8)));
        headers.setBasicAuth(encodedAuthKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

    @Transactional
    public void tossPaymentFail(String code, String message, String orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
        payment.toBuilder().paySuccessYN(false).failReason(message).build();
        paymentRepository.save(payment);
    }


    @Transactional
    public Map cancelPaymentPoint(String email, String paymentKey, String cancelReason) {
        Payment payment = paymentRepository.findByPaymentKeyAndMember_Email(paymentKey, email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));

        // 포인트 취소 시 금액 부족하면 환불 불가
        if(payment.getMember().getPoint() >= payment.getAmount()){
            Payment updatedPayment = payment.toBuilder()
                    .cancelYN(true) //취소 여부
                    .cancelReason(cancelReason) // 취소 이유
                    .member(Member.builder() // 환불 금액만큼 차감
                            .point(payment.getMember().getPoint() - payment.getAmount())
                            .build()).build();
            paymentRepository.save(updatedPayment);
            return tossPaymentCancel(paymentKey, cancelReason); // 키 값 반환
        }
        throw new BusinessLogicException(ExceptionCode.PAYMENT_NOT_ENOUGH_POINT);
    }

    /**
     * 헤더에 시크릿 키를 인코딩하여 POST요청한 후 받은 값을 리턴
     * - 다형성을 위해 상위 인터페이스인 Map을 선택
     * */
    public Map tossPaymentCancel(String paymentKey, String cancelReason) {
        RestTemplate restTemplate = new RestTemplate(); // HTTP 요청 양방향 응답 받기 위한 인스턴스
        HttpHeaders headers = getHeaders(); // HTTP 요청에 필요한 헤더 생성
        JSONObject params = new JSONObject();
        params.put("cancelReason", cancelReason); // 취소사유를 포함한 파라미터 생성

        // HTTP POST 요청 전송
        return restTemplate.postForObject(TossPaymentConfig.URL + paymentKey + "/cancel",
                new HttpEntity<>(params, headers),
                Map.class);
    }

    /**
     * 결제 내역 조회
     * */
    public Slice<Payment> findAllChargingHistories(String username, Pageable pageable) {
        memberService.verifyExistsEmail(username);
        return paymentRepository.findAllByMember_Email(username,
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.Direction.DESC, "paymentId")
        );
    }

}
