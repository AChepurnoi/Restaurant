package com.graniumhub.data.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Sasha on 3/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInput {

    @NotNull
    @Size(min = 2, max = 30)
    private String login;
    @NotNull
    @Size(min = 2, max = 30)
    private String password;
    @NotNull
    @Size(min = 2, max = 30)
    private String phone;
    @NotNull
    @Size(min = 2, max = 30)
    private String email;


}
