package com.example.magnet.mentee.service;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.service.MemberService;
import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentee.repository.MenteeRepository;
import com.example.magnet.mentoring.repository.MentoringRepository;
import com.example.magnet.payment.dto.PaymentDto;
import com.example.magnet.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

import static com.example.magnet.mentee.mapper.MenteeMapper.menteePostDtoToEntity;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MenteeService {
    private final MenteeRepository menteeRepository;
    private final PaymentService paymentService;


    /**
     * 결제 승인 후 mentee 테이블에 해당 멘티를 등록합니다.
     * */
    public void paidMentee(MenteePostDto menteePostDto, Long memberId) {
        // paymentkey를 통해 결제가 승인됐는지 검증
        if(paymentService.beforePaidMentoring(menteePostDto.getPaymentKey())) {
            //menteeDto 엔티티로 변환
            Mentee mentee = menteePostDtoToEntity(menteePostDto, memberId);
            menteeRepository.save(mentee);
        }

    }
}
