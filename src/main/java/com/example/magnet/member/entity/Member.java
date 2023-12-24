package com.example.magnet.member.entity;

import com.example.magnet.mentor.entity.Mentor;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;


    private String username;

    private String password;

    private String email;
    private String phone;

    private String picture;

    @Embedded // 내장 타입을 포함함 > 이거나 Embeddable 하나만 사용하면 된다.
    private Address address;

    private String latitude;
    private String longitude;


//    @ElementCollection(targetClass = Role.class) // 값 타입 컬렉션 표현 jpa 어노테이션
//    @CollectionTable(name = "member_roles", joinColumns = @JoinColumn(name = "member_id")) // Enum 타입 값을 문자열로 저장하도록 지정
//    @Enumerated(EnumType.STRING)
//    private Set<Role> roles;

    public enum Role {
        ADMIN,
        MENTOR,
        MENTEE,
        USER
    }

    public Member(String username, String password, String email, String phone, String picture, Address address, String latitude, String longitude) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.picture = picture;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
