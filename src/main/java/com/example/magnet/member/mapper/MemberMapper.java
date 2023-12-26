package com.example.magnet.member.mapper;

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
                .password(dto.getPassword())
                .username(dto.getName())
                .phone(dto.getPhone())
//                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .address(Address.builder()
                        .city(dto.getAddressDto().getCity())
                        .street(dto.getAddressDto().getStreet())
                        .build())
                .build();

        return result;
    }

}
