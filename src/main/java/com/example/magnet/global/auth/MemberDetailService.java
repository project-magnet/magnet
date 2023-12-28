package com.example.magnet.global.auth;

import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.global.exception.BusinessLogicException;
import com.example.magnet.global.exception.ExceptionCode;
import com.example.magnet.member.entity.Member;
import com.example.magnet.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

/**
 * 사용자 정보 load 인터페이스
 * - 사용자 정보는 userDetails로 관리
 * - DB에서 사용자의 크리덴셜을 조회한 후, 조회한 크리덴셜을 AuthenticationManager에게 전달
 * */
@Component
@Slf4j
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    public MemberDetailService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);// db에서 조회한 객체를 리턴해 인증절차 수행
    }

    private final class MemberDetails extends Member implements UserDetails { // member 권한 정보 생성, 데이터베이스에서 조회한 회원 정보를 Spring Security의 User 정보로 변환하는 과정과 User의 권한 정보를 생성하는 과정을 캡슐화
          MemberDetails(Member member) {
              logger.info("member 권한 정보 생성 - setter ");
//            MemberBuilder builder = member.toBuilder();
//            builder.id(member.getId());
//            builder.email(member.getEmail());
//            builder.password(member.getPassword());
//            builder.roles(member.getRoles());
//
//            setMemberDetails(builder.build());
              setId(member.getId());
              setEmail(member.getEmail());
              setPassword(member.getPassword());
              setRoles(member.getRoles());
          }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
              logger.info("DB에 저장된 Role 정보로 사용자 권한 목록 생성");
            return authorityUtils.createAuthorities(this.getRoles()); // DB에 저장된 Role 정보로 사용자 권한 목록 생성
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }


}
