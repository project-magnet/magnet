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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mentor extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTOR_ID")
    private Long id;

    private String career;
    private String field;
    private String task;




    //member, mentor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    // mentoring, mentor
    @OneToMany(mappedBy = "mentor")
    private List<Mentoring> mentoringList = new ArrayList<>();
}
