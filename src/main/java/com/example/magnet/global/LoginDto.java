package com.example.magnet.global;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class LoginDto {
    private String username;

//    @Pattern(regexp = "^(?=.*[!@#$%^&*])(?=\\S+$).{8,16}$",
//            message = "비밀번호는 8~16자이어야 하며, 특수기호를 포함해야 합니다.")
    private String password;
}
