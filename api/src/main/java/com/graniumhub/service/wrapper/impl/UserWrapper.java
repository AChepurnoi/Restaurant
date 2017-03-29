package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class UserWrapper implements AbstractDTOWrapper<UserInput, User, UserResponse> {
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public User toEntity(UserInput input) {
        return new User(0,
                input.getLogin(),
                encoder.encode(input.getPassword()),
                input.getEmail(),
                false);
    }

    @Override
    public UserResponse toResponse(User entity) {
        return new UserResponse(entity.getId(), entity.getLogin(), entity.getEmail(), entity.isAdmin());
    }

    @Override
    public Class<User> entityClass() {
        return User.class;
    }

    @Override
    public Class<UserInput> inputClass() {
        return UserInput.class;
    }

    @Override
    public Class<UserResponse> responseClass() {
        return UserResponse.class;
    }
}
