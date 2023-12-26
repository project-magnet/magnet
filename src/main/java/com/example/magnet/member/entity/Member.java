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
//    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE; // dto, service에서 추가하는 것으로 변경

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



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

    public enum MemberRole {
        ADMIN,
        MENTOR,
        MENTEE,
        USER
    }

}
