package com.example.magnet.global.auth.handler;

import com.example.magnet.global.exception.BusinessLogicException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.ErrorResponse;

import java.io.IOException;

import static org.springframework.http.HttpStatus.*;

@Slf4j
public class LoginAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private static final Logger logger = LoggerFactory.getLogger(LoginAuthenticationFailureHandler.class);

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException{

        logger.info("로그인 실패: {}", exception.getMessage());
        sendErrorResponse(response);

    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException{
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.create(new Throwable("UNAUTHORIZED"), HttpStatus.UNAUTHORIZED, "사용자 인증 실패"); // (2-2)
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }


}
