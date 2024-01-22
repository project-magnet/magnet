package com.example.magnet.mentor.mapper;

import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.dto.MentorResponseDto;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

//@Component
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
                    .category(mentoring.getCategory())
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
}
