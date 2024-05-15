package com.example.magnet.mentor.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.member.service.MemberService;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
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
import java.util.Optional;

import static com.example.magnet.mentor.mapper.MentorMapper.MentorPostDtoToMentor;
import static com.example.magnet.mentor.mapper.MentorMapper.mapToResponseDtos;

@Service
@Valid
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MentorService {
    private final MentorRepository mentorRepository;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberService memberService;


    public void createMentor(List<String> roles, Long memberId, MentorPostDto mentorPostDto) {
        //dto 변환
        Mentor mentor = MentorPostDtoToMentor(mentorPostDto);
        Member findMember = memberService.findMemberById(memberId);

        Mentor.MentorBuilder saveMentor = mentor.toBuilder();
        saveMentor.member(findMember);

        if(!roles.contains("ROLE_MENTOR")){
            // DB에 MENTOR 권한 부여 후 반영 - member.getRoles > add("MENTOR")
            List<String> updatedRoles = findMember.getRoles();
            updatedRoles.add("MENTOR");
            findMember.setRoles(updatedRoles);
            memberRepository.save(findMember); // 기존의 컬럼에서 값을 조회하고 수정하지 않았다.
        }

        mentorRepository.save(saveMentor.build());

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

    @CacheEvict(value = "mentoringCache", allEntries = true) // 추가적으로 멘토링 삭제 로직도 나가야된다.
    public void remove(Long memberId) {
        Mentor findMentor = mentorRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTOR_NOT_FOUND));
        mentorRepository.delete(findMentor);
    }
}
