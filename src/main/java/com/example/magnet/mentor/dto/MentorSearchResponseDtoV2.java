package com.example.magnet.mentor.dto;

import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MentorSearchResponseDtoV2 {
    private Long mentorId;
    private String mentorName;

    private String career; // 경력
    private String field;  // 직무분야
    private String task; // 현직- 기업정보
    private String email; // 연락 이메일
    private String phone; // 연락처
    private String aboutMe;// 자기소개
    private String github; // github 링크
    private List<MentoringDto> mentoringDtoList;

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class MentoringDto {
        private Long id;
        private String title;
        private String content;
        private String pay;
        private String period;
        private int participants;
        private String category;

        @QueryProjection
        public MentoringDto(Long id, String title, String content, String pay, String period, int participants, String category) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.pay = pay;
            this.period = period;
            this.participants = participants;
            this.category = category;
        }
    }

    @QueryProjection
    public MentorSearchResponseDtoV2(Mentor mentor){
        mentorId = mentor.getId();
        mentorName = mentor.getMentorName();
        career = mentor.getCareer();
        field = mentor.getField();
        task = mentor.getTask();
        email = mentor.getEmail();
        phone = mentor.getPhone();
        aboutMe = mentor.getAboutMe();
        github = mentor.getGithub();
        mentoringDtoList = mentor.getMentoringList().stream()
                .map(mentoring -> new MentoringDto(
                        mentoring.getId(),
                        mentoring.getTitle(),
                        mentoring.getContent(),
                        mentoring.getPay(),
                        mentoring.getPeriod(),
                        mentoring.getParticipants(),
                        mentoring.getCategory().toString()))
                .toList();

    }


}
