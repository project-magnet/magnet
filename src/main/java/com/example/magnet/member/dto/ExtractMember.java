package com.example.magnet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExtractMember {
    private Long memberId;
    private String username;
    private List<String> roles;
}
