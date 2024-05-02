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
    private String email;

    @Column
    private String schedule;

    @Column
    private String phone;

    private String paymentKey; // oneToMay 대신 느슨한 결합


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENTORING_ID")
    private Mentoring mentoring;

    @Builder(toBuilder = true)
    public Mentee(Long id, String message, String schedule, Member member, Mentoring mentoring, String email,String phone, String paymentKey) {
        this.id = id;
        this.message = message;
        this.schedule = schedule;
        this.member = member;
        this.mentoring = mentoring;
        this.email = email;
        this.paymentKey = paymentKey;
        this.phone = phone;
    }

}
