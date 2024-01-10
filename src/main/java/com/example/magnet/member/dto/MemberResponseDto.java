package com.example.magnet.member.dto;

import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import jakarta.validation.Valid;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder(toBuilder = true)
public class MemberResponseDto {
    private Long id;
    private String username;
    private String nickName;
    private String email;
//    private String password;  // 복호화 여부 프론트랑 상의
    private String phone;
    private String picture;
    private String memberStatus;
    private String city;
    private String street;

    private List<Long> mentoringIdList;
    private List<Mentor> mentorList;
    private List<Mentee> menteeList;

//    @Valid // 내장타입 검증
//    private MemberResponseDto.AddressDto addressDto;
//
//    @Getter
//    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class AddressDto {
//        private String city;
//        private String street;
//    }


}
