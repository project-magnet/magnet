package com.example.magnet.mentoring.service;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.repository.MentorRepository;
import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.repository.MentoringRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.example.magnet.mentoring.mapper.MentoringMapper.entityToMentoringResponseDto;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MentoringService {
    private final MentoringRepository mentoringRepository;
    private final MentorRepository mentorRepository;
    private final MemberRepository memberRepository;

    public Member getMemberEntity(Long memberId){
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public Mentor getMentorEntity(Long memberId){
        Mentor findMentor =  mentorRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTOR_NOT_FOUND));
        return findMentor;
    }

    //멘토링 등록
    public void register(Long memberId, Mentoring mentoring) {
        //멘토 엔티티를 불러온 뒤, 전달 받은 mentoring 엔티티에 추가한다.
        Mentor findMentor =  getMentorEntity(memberId);
        Member findMember = getMemberEntity(memberId);

        // 멘토링에 멘토 정보 저장
        Mentoring.MentoringBuilder mentoringBuilder = mentoring.toBuilder();
        mentoringBuilder.member(findMember).mentor(findMentor); // db에 존재하는 멘토를 참조

        mentoringRepository.save(mentoringBuilder.build());

    }

    public MentoringResponseDto mentoringInfo(Long mentoringId) {
        Mentoring mentoring = mentoringRepository.findMentoringByMentoringId(mentoringId);
        return entityToMentoringResponseDto(mentoring);
    }
}
