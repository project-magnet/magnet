package com.example.magnet.mentoring.mapper;


import com.example.magnet.mentoring.dto.MentoringPostDto;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MentoringMapper {


    public static Mentoring mentoringPostDtoToMentoring(MentoringPostDto mentoringPostDto){
        if(mentoringPostDto == null){
            return null;
        }

        Mentoring mentoring = Mentoring.builder()
                .title(mentoringPostDto.getTitle())
                .content(mentoringPostDto.getContent())
                .pay(mentoringPostDto.getPay())
                .period(mentoringPostDto.getPeriod())
                .participants(mentoringPostDto.getParticipants())
                .category(Mentoring.Category.valueOf(mentoringPostDto.getCategory()))
                .build();

        return mentoring;

    }
}
