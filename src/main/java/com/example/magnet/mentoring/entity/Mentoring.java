package com.example.magnet.mentoring.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.member.entity.Member;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.payment.entity.Payment;
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

    @Column(unique = true)
    private String title;

    @Column
    private String content;
    private String pay;

    @Column
    private String period; // 전체 기간

    @Column
    private int participants;

    @Enumerated(EnumType.STRING)
    private Category category;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENTOR_ID")
    private Mentor mentor;


    @OneToMany(mappedBy = "mentoring")
    private List<Mentee> menteeList = new ArrayList<>();
    //menteeId


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

//    @OneToMany(mappedBy = "mentoring")
//    private List<Payment> paymentList = new ArrayList<>();


    @Builder(toBuilder = true)
    public Mentoring(Long id, String title, String content, String pay, String period, int participants, Category category, Mentor mentor, List<Mentee> menteeList, Member member) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.pay = pay;
        this.period = period;
        this.participants = participants;
        this.category = category;
        this.mentor = mentor;
        this.menteeList = menteeList;
        this.member = member;
    }

    @Builder
    public Mentoring(Long id, Member member, Mentor mentor) {
        this.id = id;
        this.member = member;
        this.mentor = mentor;
    }

    @Getter
    public enum Category{
        DEVELOPMENT("개발"),
        MARKETING("마케팅"),
//        WEB_DESIGN("웹디자인"),
//        UI_UX("UI/UX"),
        PRODUCT_MANAGER("프로덕트매니저"),
        BACKEND("백엔드"),
        FRONTEND("프론트엔드"),
        DEVOPS("데브옵스"),
        DATA_ENGINEER("데이터 엔지니어"),
        SERVER_ENGINEER("서버 엔지니어"),
        AI("AI");

        private final String category;

        Category(String category){
            this.category = category;
        }

    }
}
