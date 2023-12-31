package com.example.magnet.global.exception;

public class BusinessLogicException extends RuntimeException{
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode){
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
