package com.example.magnet.mentee.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentoring.entity.Mentoring;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Mentee extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTEE_ID")
    private Long id;

    private String message;
    private String schedule;


    //membr
    @OneToMany(mappedBy = "mentee")
    private List<Member> members = new ArrayList<>();

    //mentorings
    @OneToMany(mappedBy = "mentee")
    private List<Mentoring> mentoringList = new ArrayList<>();

}
