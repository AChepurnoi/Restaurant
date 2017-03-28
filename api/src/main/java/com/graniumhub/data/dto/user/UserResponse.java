package com.graniumhub.data.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * Created by Sasha on 3/28/17.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private int id;
    private String login;
    private String email;
    private boolean admin;
}
