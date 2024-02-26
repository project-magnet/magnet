package com.example.magnet.mentee.mapper;

import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.dto.MenteePostDto;
import com.example.magnet.mentee.dto.MenteeResponseDto;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@RequiredArgsConstructor
public class MenteeMapper {

    public static Mentee menteePostDtoToEntity(MenteePostDto menteePostDto, Long memberId){
        if(menteePostDto==null) {
            return null;
        }

        return Mentee.builder()
                .member(Member.builder().id(memberId).build())
                .mentoring(Mentoring.builder().id(menteePostDto.getMentoringId()).build())
                .message(menteePostDto.getMessage())
                .schedule(menteePostDto.getSchedule())
                .build();
    }

    public static MenteeResponseDto MenteeToMenteeResponseDto(Mentee mentee){
        return MenteeResponseDto.builder()
                .message(mentee.getMessage())
                .schedule(mentee.getSchedule())
                .mentoringId(mentee.getMentoring().getId())
                .memberId(mentee.getMember().getId())
                .menteeId(mentee.getId())
                .build();
    }
}
