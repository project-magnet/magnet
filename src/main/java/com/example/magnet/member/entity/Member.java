package com.example.magnet.member.entity;

import com.example.magnet.mentor.entity.Mentor;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String username;
    private String email;
    private String phone;

    private String picture;

    @Embedded // 내장 타입을 포함함 > 이거나 Embeddable 하나만 사용하면 된다.
    private Address address;

    private String latitude;
    private String longitude;


    @ElementCollection(targetClass = Role.class) // 값 타입 컬렉션 표현 jpa 어노테이션
    @CollectionTable(name = "member_roles", joinColumns = @JoinColumn(name = "member_id")) // Enum 타입 값을 문자열로 저장하도록 지정
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    public enum Role {
        ADMIN,
        MENTOR,
        MENTEE,
        USER
    }

}
