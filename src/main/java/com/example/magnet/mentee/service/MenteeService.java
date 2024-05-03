package com.example.magnet.mentee.service;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.member.service.MemberService;
import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentee.repository.MenteeRepository;
import com.example.magnet.mentor.dto.MentorsMenteeDto;
import com.example.magnet.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.magnet.mentee.mapper.MenteeMapper.MenteeToMenteeResponseDto;
import static com.example.magnet.mentee.mapper.MenteeMapper.menteePostDtoToEntity;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MenteeService {
    private final MenteeRepository menteeRepository;
    private final PaymentService paymentService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;


    /**
     * 결제 승인 후 mentee 테이블에 해당 멘티를 등록합니다.
     * */
    public void paidMentee(MenteePostDto menteePostDto, Long memberId, List<String> roles) {
        // paymentkey를 통해 결제가 승인됐는지 검증
        if(paymentService.beforePaidMentoring(menteePostDto.getPaymentKey())) {

            if (!roles.contains("ROLE_MENTEE")) { // 멘티권한 보유중이라면 굳이 추가 안해도 된다.
                // 회원에게 멘티권한 부여
                Member findMember = memberService.findMemberById(memberId);
                List<String> updatedRoles = findMember.getRoles();
                updatedRoles.add("MENTEE");
                findMember.setRoles(updatedRoles);
                memberRepository.save(findMember);
            }

            Mentee mentee = menteePostDtoToEntity(menteePostDto, memberId);


            menteeRepository.save(mentee);
            // payment가 mentee 정보를 추적할 수 있도록 paymentKey를 기준으로 객체 생성 후 저장
            paymentService.paidMenteeForChecking(mentee);
        }

    }

    public MenteeResponseDto getInfo(Long menteeId, Long memberId) {
        Mentee mentee = menteeRepository.findByIdAndMemberId(menteeId, memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MENTEE_NOT_FOUND));
        return MenteeToMenteeResponseDto(mentee);
    }



    public List<AppliedMenteesDto> getAppliedMentees(Long mentoringId) {
        return menteeRepository.mentees(mentoringId);
    }


    /**
     * 결제 취소 시 mentee 정보 삭제하는 메소드
     * paymentKey를 기준으로
     * */
//    public void deleteMentee()
}
