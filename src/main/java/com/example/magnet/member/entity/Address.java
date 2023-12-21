package com.example.magnet.member.entity;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;

@Embeddable // member 엔티티의 일부로 내장
@Getter
public class Address {
    private String city;
    private String street;

    protected Address(){}; //jpa 내부에서만 사용되는 기본 생성자


    @Builder
    public Address(String city, String street) {
        this.city = city;
        this.street = street;
    }
}
