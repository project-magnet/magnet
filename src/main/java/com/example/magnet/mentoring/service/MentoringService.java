package com.example.magnet.mentoring.service;

import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.repository.MentorRepository;
import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.dto.mentoringListPagingDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.repository.MentoringRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.magnet.mentoring.mapper.MentoringMapper.entityToMentoringResponseDto;
import static com.example.magnet.mentoring.mapper.MentoringMapper.mentoringPostDtoToMentoring;

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
    public void register(Long memberId, MentoringPostDto mentoringPostDto) {
        //멘토 엔티티를 불러온 뒤, 전달 받은 mentoring 엔티티에 추가한다.
        Mentor findMentor =  getMentorEntity(memberId);
        Member findMember = getMemberEntity(memberId);

        Mentoring mentoring = mentoringPostDtoToMentoring(mentoringPostDto);

        // 멘토링에 멘토 정보 저장
        Mentoring.MentoringBuilder mentoringBuilder = mentoring.toBuilder();
        mentoringBuilder.member(findMember).mentor(findMentor); // db에 존재하는 멘토를 참조

        mentoringRepository.save(mentoringBuilder.build());

    }

    // 멘토링 단건 조회
    public MentoringResponseDto mentoringInfo(Long mentoringId) {
        Mentoring mentoring = mentoringRepository.findMentoringByMentoringId(mentoringId);
        return entityToMentoringResponseDto(mentoring);
    }

    @Transactional(readOnly = true)
    public Page<mentoringListPagingDto> mentoringInfoList(int offset, int size) {
        Pageable pageable = PageRequest.of(offset, size);
        return mentoringRepository.mentoringList(pageable);
    }

    public void remove(Long memberId, Long mentoringId) {
        // 매개변수로 전달받은 memberId와 mentoringId로 조회한 데이터의 memberId가 동일하면 삭제 > 실 소유자
        Mentoring mentoring = mentoringRepository.findById(mentoringId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTORING_NOT_FOUND));

        Long realMentor = mentoring.getMember().getId();

        if(memberId.equals(realMentor)){
            mentoringRepository.delete(mentoring);
        }
    }
}
