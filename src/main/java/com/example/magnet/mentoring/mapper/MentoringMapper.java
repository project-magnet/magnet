package com.example.magnet.mentoring.mapper;


import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.dto.MentoringResponseDto;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MentoringMapper {


    public static Mentoring mentoringPostDtoToMentoring(MentoringPostDto mentoringPostDto){
        if(mentoringPostDto == null){
            return null;
        }

        return Mentoring.builder()
                .title(mentoringPostDto.getTitle())
                .content(mentoringPostDto.getContent())
                .pay(mentoringPostDto.getPay())
                .period(mentoringPostDto.getPeriod())
                .participants(mentoringPostDto.getParticipants())
                .category(Mentoring.Category.valueOf(mentoringPostDto.getCategory()))
                .build();

    }

    // mentoringInfo
    public static MentoringResponseDto entityToMentoringResponseDto(Mentoring mentoring){
        return MentoringResponseDto.builder()
                .mentoringId(mentoring.getId())
                .title(mentoring.getTitle())
                .content(mentoring.getContent())
                .pay(mentoring.getPay())
                .period(mentoring.getPeriod())
                .participants(mentoring.getParticipants())
                .category(mentoring.getCategory().toString())
                .mentorId(mentoring.getMentor().getId())
                .career(mentoring.getMentor().getCareer())
                .field(mentoring.getMentor().getField())
                .task(mentoring.getMentor().getTask())
                .email(mentoring.getMentor().getEmail())
                .phone(mentoring.getMentor().getPhone())
                .aboutMe(mentoring.getMentor().getAboutMe())
                .github(mentoring.getMentor().getGithub())
                .build();
        // 멘티, 멘토 정보가 필요하다. > menteeId를 전달. > 멘토링 리스트를 출력하고
    }


}
