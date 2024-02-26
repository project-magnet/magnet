package com.example.magnet.member.mapper;

import com.example.magnet.member.dto.MemberPatchDto;
import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.dto.MemberResponseDto;
import com.example.magnet.member.entity.Address;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentee.mapper.MenteeMapper;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentor.mapper.MentorMapper;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.mentoring.mapper.MentoringMapper;
import com.example.magnet.payment.dto.PaymentResponseDto;
import com.example.magnet.payment.entity.Payment;
import com.example.magnet.payment.mapper.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.magnet.mentor.mapper.MentorMapper.*;
import static java.util.Arrays.stream;

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

    // get
    public MemberResponseDto memberToResponseDto(Member result) {
        if(result == null){
            return null;
        }

        List<MentorResponseDto> mentorList = result.getMentorList().stream().map(MentorMapper::MentorToMentorResponseDto).toList();
        List<MenteeResponseDto> menteeList = result.getMenteeList().stream().map(MenteeMapper::MenteeToMenteeResponseDto).toList();
        List<MentoringResponseDto> mentoringList = result.getMentoringList().stream().map(MentoringMapper::entityToMentoringResponseDto).toList();
        List<PaymentResponseDto> paymentList = result.getPaymentList().stream().map(PaymentMapper::PaymentToPaymentDto).toList();

        MemberResponseDto.MemberResponseDtoBuilder dtoBuilder = MemberResponseDto.builder()
                .id(result.getId())
                .username(result.getUsername())
                .nickName(result.getNickName())
                .email(result.getEmail())
                .phone(result.getPhone())
                .memberStatus(result.getMemberStatus().toString())
                .city(result.getAddress().getCity())
                .street(result.getAddress().getStreet())
                .mentorList(mentorList)
                .menteeList(menteeList)
                .mentoringList(mentoringList)
                .paymentList(paymentList)
                .roles(result.getRoles());



        return dtoBuilder.build();
    }

    //        // 멘토 객체 리스트 빌더에 추가
//        if(result.getMentorList() != null && !result.getMentorList().isEmpty()) {
//            List<Mentor> mentorList = new ArrayList<>(result.getMentorList());
//            dtoBuilder.mentorList(mentorList);
//        }
//
//        // 멘티 객체 리스트 빌더에 추가
//        if(result.getMenteeList() != null && !result.getMenteeList().isEmpty()){
//            List<Mentee> menteeList = new ArrayList<>(result.getMenteeList());
//             dtoBuilder.menteeList(menteeList);
//        }
}
