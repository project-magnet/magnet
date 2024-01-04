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

    //member
    @OneToMany(mappedBy = "mentor")
    private List<Member> members = new ArrayList<>();

    // mentoring
    @OneToMany(mappedBy = "mentor")
    private List<Mentoring> mentoringList = new ArrayList<>();
}
