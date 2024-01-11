package com.example.magnet.member.mapper;

import com.example.magnet.member.dto.MemberPatchDto;
import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.dto.MemberResponseDto;
import com.example.magnet.member.entity.Address;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

        MemberResponseDto.MemberResponseDtoBuilder dtoBuilder = MemberResponseDto.builder()
                .id(result.getId())
                .username(result.getUsername())
                .nickName(result.getNickName())
                .email(result.getEmail())
                .phone(result.getPhone())
                .picture(result.getPicture())
                .memberStatus(result.getMemberStatus().toString())
                .city(result.getAddress().getCity())
                .street(result.getAddress().getStreet())
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
