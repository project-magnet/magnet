package com.example.magnet.mentor.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDtoV2;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.mapper.MentorMapper;
import com.example.magnet.mentor.repository.MentorRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static com.example.magnet.mentor.mapper.MentorMapper.MentorPostDtoToMentor;
import static com.example.magnet.mentor.mapper.MentorMapper.mapToResponseDtos;

@Service
@Valid
@RequiredArgsConstructor
@Transactional
public class MentorService {
    private final MentorRepository mentorRepository;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;


    public void createMentor(Long memberId, MentorPostDto mentorPostDto) {
        //dto 변환
        Mentor mentor = MentorPostDtoToMentor(mentorPostDto);
        // memberId로 멤버와 멘토 연관관계 생성
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 연관관계 설정
        Mentor.MentorBuilder saveMentor = mentor.toBuilder();
        saveMentor.member(findMember);

        // DB에 MENTOR 권한 부여 후 반영 - member.getRoles > add("MENTOR")
//        List<String> updatedRoles = new ArrayList<>(findMember.getRoles()); // 수정 가능한 새로운 리스트 생성
        List<String> updatedRoles = findMember.getRoles();
        updatedRoles.add("MENTOR");
        // 권한 부여
        findMember.setRoles(updatedRoles);
        memberRepository.save(findMember); // 기존의 컬럼에서 값을 조회하고 수정하지 않았다.

        mentorRepository.save(saveMentor.build());

        // 현재 스레드의 Authentication 업데이트
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = customAuthorityUtils.createAuthorities(findMember.getRoles());
        Authentication updatedAuthentication = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(), authorities);
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);

    }


    public MentorResponseDto getMentor(Long memberId) {
        // memberId와 일치하는 멘토 조회
        Mentor findMentor = mentorRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTOR_NOT_FOUND));
        return MentorMapper.MentorToMentorResponseDto(findMentor);
    }


    @Transactional(readOnly = true)
    public Page<MentorSearchResponseDtoV2> search(int offset, int size) {
        Pageable pageable = PageRequest.of(offset, size);
        Page<MentorSearchResponseDtoV2> page = mentorRepository.search2(pageable);
        return page;
    }

    public void remove(Long memberId) {
        Mentor findMentor = mentorRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTOR_NOT_FOUND));// 멘토를 생성하지 않은 경우
        mentorRepository.delete(findMentor);
    }
}
