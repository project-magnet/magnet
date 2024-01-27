package com.example.magnet.mentor.mapper;

import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.dto.MentorSearchResponseDto;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class MentorMapper {

    //post
    public static Mentor MentorPostDtoToMentor(MentorPostDto mentorPostDto){
        if(mentorPostDto == null){
            return null;
        }
        Mentor mentor = Mentor.builder()
                .mentorName(mentorPostDto.getMentorName())
                .field(mentorPostDto.getField())
                .phone(mentorPostDto.getPhone())
                .task(mentorPostDto.getTask())
                .email(mentorPostDto.getEmail())
                .github(mentorPostDto.getGithub())
                .career(mentorPostDto.getCareer())
                .aboutMe(mentorPostDto.getAboutMe())
                .build();

        return mentor;

    }

    // get
    public static MentorResponseDto MentorToMentorResponseDto(Mentor findMentor) {
        if(findMentor == null){
            return null;
        }

        List<MentorResponseDto.MentoringDto> mentoringDtoList = new ArrayList<>();
        for(Mentoring mentoring: findMentor.getMentoringList()){
            MentorResponseDto.MentoringDto mentoringDto = MentorResponseDto.MentoringDto.builder()
                    .id(mentoring.getId())
                    .title(mentoring.getTitle())
                    .content(mentoring.getContent())
                    .pay(mentoring.getPay())
                    .period(mentoring.getPeriod())
                    .participants(mentoring.getParticipants())
                    .category(mentoring.getCategory().toString()) // enum 타입 변경으로 인한 수정
                    .build();
            mentoringDtoList.add(mentoringDto);
        }

        MentorResponseDto dto = MentorResponseDto.builder()
                .mentorId(findMentor.getId())
                .mentorName(findMentor.getMentorName())
                .career(findMentor.getCareer())
                .field(findMentor.getField())
                .task(findMentor.getTask())
                .email(findMentor.getEmail())
                .phone(findMentor.getPhone())
                .aboutMe(findMentor.getAboutMe())
                .github(findMentor.getGithub())
                .mentoringDtoList(mentoringDtoList)
                .build();

        return dto;
    }

    // getMentorList
    public static List<MentorResponseDto> mapToResponseDtos(List<MentorSearchResponseDto> searchResponseDtos){
        return searchResponseDtos.stream()
                .map(searchResponseDto -> MentorResponseDto.builder()
                        .mentorId(searchResponseDto.getMentorId())
                        .mentorName(searchResponseDto.getMentorName())
                        .career(searchResponseDto.getCareer())
                        .field(searchResponseDto.getField())
                        .task(searchResponseDto.getTask())
                        .email(searchResponseDto.getEmail())
                        .phone(searchResponseDto.getPhone())
                        .aboutMe(searchResponseDto.getAboutMe())
                        .github(searchResponseDto.getGithub())
                        .mentoringDtoList(Collections.singletonList(MentorResponseDto.MentoringDto.builder()
                                .id(searchResponseDto.getMentoringId())
                                .title(searchResponseDto.getMentoringTitle())
                                .content(searchResponseDto.getMentoringContent())
                                .pay(searchResponseDto.getMentoringPay())
                                .period(searchResponseDto.getMentoringPeriod())
                                .participants(searchResponseDto.getMentoringParticipants())
                                .category(searchResponseDto.getMentoringCategory())
                                .build()))
                        .build())
                .collect(Collectors.toList());
    }
}
