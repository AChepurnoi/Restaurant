package com.graniumhub.data.exception;

import lombok.Data;
import org.springframework.validation.FieldError;

import java.util.List;

/**
 * Created by Sasha on 4/21/17.
 */
public class InvalidInputException extends RuntimeException{
    private List<FieldError> errors;

    public InvalidInputException() {
    }

    public InvalidInputException(String message) {
        super(message);
    }

    public List<FieldError> getErrors() {
        return errors;
    }

    public void setErrors(List<FieldError> errors) {
        this.errors = errors;
    }

    public InvalidInputException(List<FieldError> errors){
        this.errors = errors;
    }
}
