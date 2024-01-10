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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mentoring extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTORING_ID")
    private Long id;
    private String title;
    private String content;
    private String pay;
    private String period;
    private int participants;



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



}
