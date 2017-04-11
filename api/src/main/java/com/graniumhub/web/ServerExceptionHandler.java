package com.graniumhub.web;

import com.graniumhub.data.exception.ExceptionResponse;
import com.graniumhub.data.exception.ServerException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Created by Sasha on 4/11/17.
 */
@ControllerAdvice
public class ServerExceptionHandler {


    @ExceptionHandler({ServerException.class, UsernameNotFoundException.class})
    public ResponseEntity handleServerException(ServerException ex){
        ExceptionResponse response = new ExceptionResponse(ex.getMessage(),400);
        return ResponseEntity.badRequest().body(response);
    }

}
