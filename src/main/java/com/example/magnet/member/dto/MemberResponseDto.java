package com.example.magnet.member.dto;

import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.payment.dto.PaymentResponseDto;
import com.example.magnet.payment.dto.PaymentResponseDtoV2;
import com.example.magnet.payment.entity.Payment;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder(toBuilder = true)
public class MemberResponseDto {
    private Long memberId;
    private String username;
    private String nickName;
    private String email;
    private String phone;
    private String memberStatus;
    private List<String> roles;
    private List<MentorResponseDto> mentorList;
    private List<PaymentResponseDtoV2> paymentList;
    private List<MenteeResponseDto> menteeList;


}
