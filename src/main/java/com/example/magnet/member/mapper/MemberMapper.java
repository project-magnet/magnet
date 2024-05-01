package com.example.magnet.member.mapper;

import com.example.magnet.member.dto.MemberPatchDto;
import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.dto.MemberResponseDto;
import com.example.magnet.member.entity.Address;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.mapper.MenteeMapper;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.mapper.MentorMapper;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.mapper.MentoringMapper;
import com.example.magnet.payment.dto.PaymentResponseDtoV2;
import com.example.magnet.payment.mapper.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@RequiredArgsConstructor
public class MemberMapper {

    // post
    public Member postDtoToEntity(MemberPostDto dto){
        if(dto == null){
            return null;
        }
        Member result = Member.builder()
                .email(dto.getEmail())
                .username(dto.getUsername())
                .nickName(dto.getNickName())
                .password(dto.getPassword())
                .phone(dto.getPhone())
                .address(Address.builder()
                        .city(dto.getAddressDto().getCity())
                        .street(dto.getAddressDto().getStreet())
                        .build())
                .build();

        return result;
    }

    // patch
    public Member patchDtoToEntity(MemberPatchDto dto, Long memberId){
        if(dto == null){
            return null;
        }

        Member.MemberBuilder memberBuilder = Member.builder().id(memberId);

        if (dto.getNickName() != null) {
            memberBuilder.nickName(dto.getNickName());
        }

        if (dto.getPhone() != null) {
            memberBuilder.phone(dto.getPhone());
        }

        if (dto.getAddressDto() != null) {
            Address.AddressBuilder addressBuilder = Address.builder();

            if (dto.getAddressDto().getCity() != null) {
                addressBuilder.city(dto.getAddressDto().getCity());
            }

            if (dto.getAddressDto().getStreet() != null) {
                addressBuilder.street(dto.getAddressDto().getStreet());
            }

            memberBuilder.address(addressBuilder.build());
        }

        return memberBuilder.build();
    }

    /**
     * 회원 정보 조회 시 연관관계에 있는 테이블을 모두 조회합니다.
     *
     * */
    public MemberResponseDto memberToResponseDto(Member result) {

        List<MentorResponseDto> mentorList = result.getMentorList().stream().map(MentorMapper::MentorToMentorResponseDto).toList();
        List<MenteeResponseDto> menteeList = result.getMenteeList().stream().map(MenteeMapper::MenteeToMenteeResponseDto).toList();
//        List<MentoringResponseDto> mentoringList = result.getMentoringList().stream().map(MentoringMapper::entityToMentoringResponseDto).toList();
        List<PaymentResponseDtoV2> paymentList = result.getPaymentList().stream().map(PaymentMapper::PaymentToPaymentDto).toList();

        MemberResponseDto.MemberResponseDtoBuilder dtoBuilder = MemberResponseDto.builder()
                .memberId(result.getId())
                .username(result.getUsername())
                .nickName(result.getNickName())
                .email(result.getEmail())
                .phone(result.getPhone())
                .memberStatus(result.getMemberStatus().toString())
                .mentorList(mentorList)
                .menteeList(menteeList)
                .paymentList(paymentList)
                .roles(result.getRoles());



        return dtoBuilder.build();
    }


}
