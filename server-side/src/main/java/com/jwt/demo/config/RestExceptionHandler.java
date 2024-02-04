package com.jwt.demo.config;


import com.jwt.demo.AddException;
import com.jwt.demo.DTO.ErrorDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = { AddException.class })
    @ResponseBody
    public ResponseEntity<ErrorDto> handleException(AddException ex) {
        return ResponseEntity.ok()
                .body(new ErrorDto(ex.getMessage()));
    }
}
