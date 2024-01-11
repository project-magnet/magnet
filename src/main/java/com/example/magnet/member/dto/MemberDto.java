package com.example.magnet.member.dto;

import com.example.magnet.member.entity.Address;
import jakarta.persistence.Embedded;
import jakarta.validation.Valid;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {
    private Long id;

    private String username;
    private String email;
    private String phone;

    private String picture;

//    @Embedded // 내장 타입을 포함함 > 이거나 Embeddable 하나만 사용하면 된다.
//    private AddressDto addressDto;

    private String latitude;
    private String longitude;

    @Valid // 내장타입 검증
    private MemberDto.AddressDto addressDto;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AddressDto {
        private String city;
        private String street;
    }
}
