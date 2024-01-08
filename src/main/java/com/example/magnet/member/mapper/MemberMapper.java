package com.example.magnet.member.mapper;

import com.example.magnet.member.dto.MemberPatchDto;
import com.example.magnet.member.dto.MemberPostDto;
import com.example.magnet.member.entity.Address;
import com.example.magnet.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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
//        Member result = Member.builder()
//                .id(memberId)
//                .nickName(dto.getNickName())
//                .phone(dto.getPhone())
//                .address(Address.builder()
//                        .city(dto.getAddressDto().getCity())
//                        .street(dto.getAddressDto().getStreet())
//                        .build())
//                .build();
//
//        return result;
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

}
