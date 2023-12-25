package com.example.magnet.global.helper.event;

import com.example.magnet.member.entity.Member;
import com.example.magnet.member.service.MemberLoginService;
import lombok.Getter;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }

}
