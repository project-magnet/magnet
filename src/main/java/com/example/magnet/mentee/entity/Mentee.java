package com.example.magnet.mentee.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentoring.entity.Mentoring;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Mentee extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTEE_ID")
    private Long id;

    private String message;
    private String schedule;

    //membr
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    //mentorings
    @OneToMany(mappedBy = "mentee")
    private List<Mentoring> mentoringList = new ArrayList<>();

    @Builder(toBuilder = true)
    public Mentee(Long id, String message, String schedule, Member member, List<Mentoring> mentoringList) {
        this.id = id;
        this.message = message;
        this.schedule = schedule;
        this.member = member;
        this.mentoringList = mentoringList;
    }

}
