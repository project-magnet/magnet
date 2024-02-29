package com.example.magnet.mentor.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentoring.entity.Mentoring;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mentor extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTOR_ID")
    private Long id;

    @Column
    private String mentorName;

    @Column
    private String career; // 경력

    @Column
    private String field;  // 직무분야

    @Column
    private String task; // 현직- 기업정보

    @Column
    private String email; // 연락 이메일

    @Column
    private String phone; // 연락처

    @Column
    private String aboutMe;// 자기소개

    @Column
    private String github; // github 링크

    // 계좌관련 정보 추가 가능


    //member, mentor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    // mentoring, mentor
    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mentoring> mentoringList = new ArrayList<>();

    @Builder(toBuilder = true)
    public Mentor(Long id, String mentorName, String career, String field, String task, String email, String phone, String aboutMe, String github, Member member, List<Mentoring> mentoringList) {
        this.id = id;
        this.mentorName = mentorName;
        this.career = career;
        this.field = field;
        this.task = task;
        this.email = email;
        this.phone = phone;
        this.aboutMe = aboutMe;
        this.github = github;
        this.member = member;
        this.mentoringList = mentoringList;
    }

    @Builder
    public Mentor(Long id, List<Mentoring> mentoringList) {
        this.id = id;
        this.mentoringList = mentoringList;
    }

    @Builder
    public Mentor(Long id, Member member){
        this.id = id;
        this.member = member;
    }
}
