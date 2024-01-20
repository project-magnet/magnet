package com.example.magnet.mentor.mapper;

import com.example.magnet.member.repository.MemberRepository;
import com.example.magnet.mentor.dto.MentorPostDto;
import com.example.magnet.mentor.entity.Mentor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MentorMapper {

    //post
    public Mentor MentorPostDtoToMentor(MentorPostDto mentorPostDto){
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
}
