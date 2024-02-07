package com.example.magnet.member.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.mentee.entity.Mentee;
import com.example.magnet.mentor.entity.Mentor;
import com.example.magnet.mentoring.entity.Mentoring;
import com.example.magnet.payment.entity.Payment;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import lombok.*;
import org.hibernate.annotations.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE member SET deleted = true, deleted_at = CURRENT_TIMESTAMP WHERE MEMBER_ID = ?")
@Where(clause = "deleted = false")
public class Member extends TimeEntity implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(unique = true)
    private String username; // unique key 설정하자

    @Column(unique = true)
    private String nickName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email; // id

    @Column(nullable = false)
    private String password;

    private String phone;

    private String picture;

    @Embedded // 내장 타입을 포함함 > 이거나 Embeddable 하나만 사용하면 된다.
    private Address address;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private MemberStatus memberStatus;

    @ElementCollection(fetch = FetchType.EAGER) // jpa에서 테이블을 새로 생성해서 관리.
//    @CollectionTable(name = "Role", joinColumns = @JoinColumn(name = "MEMBER_ID"))
    private List<String> roles = new ArrayList<>();

    // 회원 탈퇴 여부 판단
    private Boolean deleted = Boolean.FALSE; // 스케줄러 고도화

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    // 권한 부여 시 사용됨
    public void setRoles(List<String> roles) {
        this.roles = new ArrayList<>(roles); // 수정 가능한 새로운 리스트 생성
    }


    //mentor
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mentor> mentorList = new ArrayList<>();

    //mentee
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mentee> menteeList = new ArrayList<>();

    //mentoring
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mentoring> mentoringList = new ArrayList<>();

    //payment
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> paymentList = new ArrayList<>();


    //MemberDetails
    public void setMemberDetails(Member member){
        this.id = member.getId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.roles = member.getRoles();
    }

    //OAuth2MemberSuccessHandler
    public Member(String email) {
        this.email = email;
    }

    @Override
    public String getName() {
        return getEmail();
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private final String status; // final field 추가

        MemberStatus(String status) {
            this.status = status;
        }
    }

    @Builder(toBuilder = true)
    public Member(Long id, String username, String nickName, String email, String password, String phone, String picture, Address address, MemberStatus memberStatus, List<String> roles, List<Mentor> mentorList, List<Mentee> menteeList, List<Mentoring> mentoringList) {
        this.id = id;
        this.username = username;
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.picture = picture;
        this.address = address;
        this.memberStatus = memberStatus;
        this.roles = roles;
        this.mentorList = mentorList;
        this.menteeList = menteeList;
        this.mentoringList = mentoringList;
    }

    @Builder // for test
    public Member(Long id, String email){
        this.id=id;
        this.email=email;
    }

//    @Override
//    public boolean equals(Object o){
//        if(this == o) return true;
//        if(o == null || getClass() != o.getClass()) return false;
//        Role member = (Member) o;
//        return
//    }
//    @Override
//    public int hashCode() {
//        return Objects.hash(memberId, money);
//    }
}
