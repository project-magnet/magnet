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


    /**
     * 멤버, 멘토와 멘티가 각각 mentoring과 연관관계의 주인입니다.
     * */
    // mentor, mentoring
    @OneToMany(mappedBy = "mentoring")
    private List<Mentor> mentorList = new ArrayList<>();

    // mentee, mentoring
    @OneToMany(mappedBy = "mentoring")
    private List<Mentee> menteeList = new ArrayList<>();

    // member, mentoring
    @OneToMany(mappedBy = "mentoring")
    private List<Member> members = new ArrayList<>();

}
