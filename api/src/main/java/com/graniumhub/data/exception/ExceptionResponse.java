package com.graniumhub.data.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by Sasha on 4/11/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionResponse {

    private String message;
    private int code;

}
