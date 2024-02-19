package com.example.magnet.member.dto;

import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.payment.entity.Payment;
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
    private String phone;
    private String memberStatus;
    private String city;
    private String street;
    private List<String> roles;
    private Long point;
    private List<Mentor> mentorList;
    private List<Mentoring> mentoringList;
    private List<Payment> paymentList;
    private List<Mentee> menteeList;


}
