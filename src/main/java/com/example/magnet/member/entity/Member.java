package com.example.magnet.member.entity;

import com.example.magnet.global.audit.TimeEntity;
import com.example.magnet.mentor.entity.Mentor;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.lang.NonNull;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
//@Setter
//@AllArgsConstructor(access = AccessLevel.PRIVATE) // memberStatus로 인해 사용 불가능
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@ToString
public class Member extends TimeEntity implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String username;

    private String nickName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email; // id

    @Column(nullable = false) // 암호화 되므로
    private String password;

    private String phone;

    private String picture;

    @Embedded // 내장 타입을 포함함 > 이거나 Embeddable 하나만 사용하면 된다.
    private Address address;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private MemberStatus memberStatus;

    @ElementCollection(fetch = FetchType.EAGER) // 테이블이 새로 생성됨
    private List<String> roles = new ArrayList<>();




    //MemberDetails
    public void setMemberDetails(Member member){
        this.id = member.getId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.roles = member.getRoles();
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


}
