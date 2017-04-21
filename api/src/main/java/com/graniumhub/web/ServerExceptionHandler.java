package com.graniumhub.web;

import com.graniumhub.data.exception.ExceptionResponse;
import com.graniumhub.data.exception.InvalidInputException;
import com.graniumhub.data.exception.ServerException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 4/11/17.
 */
@ControllerAdvice
public class ServerExceptionHandler {

    @ExceptionHandler({ServerException.class, UsernameNotFoundException.class})
    public ResponseEntity handleServerException(Exception ex){
        ExceptionResponse response = new ExceptionResponse(ex.getMessage(),400);
        return ResponseEntity.badRequest().body(response);
    }


    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity handleWrongInputException(InvalidInputException ex){
        StringBuilder builder = new StringBuilder("Wrong input. Error in: ");
        ex.getErrors().stream().map(FieldError::getField).forEach(builder::append);
        ExceptionResponse response = new ExceptionResponse(builder.toString(), 400);
        return ResponseEntity.badRequest().body(response);
    }
}
