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

    @Column
    private String message;

    @Column
    private String schedule;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENTORING_ID")
    private Mentoring mentoring;

    @Builder(toBuilder = true)
    public Mentee(Long id, String message, String schedule, Member member, Mentoring mentoring) {
        this.id = id;
        this.message = message;
        this.schedule = schedule;
        this.member = member;
        this.mentoring = mentoring;
    }

}
