//package com.example.magnet.member.entity;
//
//import com.example.magnet.global.audit.TimeEntity;
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * 회원 탈퇴 유저 저장 엔티티
// * - username으로 식별합니다.
// * - 유저의 역할을 저장합니다.
// * */
//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class BlackList extends TimeEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private String username;
//
//    @ElementCollection
//    private List<String> roles = new ArrayList<>();
//
//    @Builder(toBuilder = true)
//    public BlackList(String username, List<String> roles) {
//        this.username = username;
//        this.roles = roles;
//    }
//}
