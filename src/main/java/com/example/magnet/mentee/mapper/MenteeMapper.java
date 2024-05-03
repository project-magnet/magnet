package com.example.magnet.mentee.mapper;

import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.dto.AppliedMenteesDto;
import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class MenteeMapper {

    public static Mentee menteePostDtoToEntity(MenteePostDto menteePostDto, Long memberId){
        if(menteePostDto==null) {
            return null;
        }

        return Mentee.builder()
                .member(Member.builder().id(memberId).build())
//                .mentoring(Mentoring.builder().title(menteePostDto.getMentoringTitle()).build())
                .mentoring(Mentoring.builder().id(menteePostDto.getMentoringId()).build())
                .message(menteePostDto.getMessage())
                .phone(menteePostDto.getPhone())
                .email(menteePostDto.getEmail())
                .schedule(menteePostDto.getSchedule())
                .paymentKey(menteePostDto.getPaymentKey())
                .build();
    }



    public static MenteeResponseDto MenteeToMenteeResponseDto(Mentee mentee) {
        return MenteeResponseDto.builder()
                .message(mentee.getMessage())
                .schedule(mentee.getSchedule())
                // mentorsPhone mentee.
//                .mentorphone(mentee.getMentoring().getMentor().getPhone())
                .mentoringId(mentee.getMentoring().getId())
                .memberId(mentee.getMember().getId())
                .menteeId(mentee.getId())
                .mentorName(mentee.getMentoring().getMentor().getMentorName())
                .email(mentee.getEmail())
                .paymentKey(mentee.getPaymentKey())
                .title(mentee.getMentoring().getTitle())
                .pay(mentee.getMentoring().getPay())
                .category(mentee.getMentoring().getCategory().toString())
                .content(mentee.getMentoring().getContent())
                .participants(mentee.getMentoring().getParticipants())
                .build();
    }

    public static List<AppliedMenteesDto> MenteeToAppliedMenteesDto(List<Mentee> menteeList) {
//        List<AppliedMenteesDto> result = new ArrayList<>();

//        for (Mentee m : menteeList) {
//            AppliedMenteesDto.AppliedMenteesDtoBuilder dtoBuilder = AppliedMenteesDto.builder()
//                    .menteeId(m.getId())
//                    .menteeNickName(m.getMember().getNickName())
//                    .email(m.getEmail())
//                    .phone(m.getPhone())
//                    .schedule(m.getSchedule());
//            result.add(dtoBuilder.build());
//        }
//
//        return result;
        return menteeList.stream()
                .map(m -> AppliedMenteesDto.builder()
                        .menteeId(m.getId())
                        .menteeNickName(m.getMember().getNickName())
                        .email(m.getEmail())
                        .phone(m.getPhone())
                        .schedule(m.getSchedule())
                        .build())
                .collect(Collectors.toList());
    }


}
