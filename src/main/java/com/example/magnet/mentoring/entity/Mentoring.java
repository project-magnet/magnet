package com.example.magnet.mentoring.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.entity.Mentor;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mentoring extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTORING_ID")
    private Long id;
    private String title;
    private String content;
    private String pay;
    private String period; // 전체 기간
    private int participants;
    private String category;



    // mentor, mentoring
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENTOR_ID")
    private Mentor mentor;

    // mentee, mentoring
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENTEE_ID")
    private Mentee mentee;

    // member, mentoring
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    @Builder(toBuilder = true)
    public Mentoring(Long id, String title, String content, String pay, String period, int participants, String category, Mentor mentor, Mentee mentee, Member member) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.pay = pay;
        this.period = period;
        this.participants = participants;
        this.category = category;
        this.mentor = mentor;
        this.mentee = mentee;
        this.member = member;
    }

    @Builder
    public Mentoring(Long id, Member member) {
        this.id = id;
        this.member = member;
    }
}
