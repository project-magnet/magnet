package com.example.magnet.member.service;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.global.helper.event.MemberRegistrationApplicationEvent;
import com.example.magnet.member.entity.Address;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public void createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword()); //db에 저장되는 password 암호화
        List<String> roles = authorityUtils.createRoles(member.getEmail());// 사용자 이메일 기반으로 사용자 역할을 생성, 저장

        Member.MemberBuilder builder = member.toBuilder();
        builder.password(encryptedPassword);
        builder.roles(roles);
        builder.memberStatus(Member.MemberStatus.MEMBER_ACTIVE);

        Member savedMember = memberRepository.save(builder.build());

        publisher.publishEvent(new MemberRegistrationApplicationEvent(savedMember));
    }

    public void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
