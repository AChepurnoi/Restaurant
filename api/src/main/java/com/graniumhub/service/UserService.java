package com.graniumhub.service;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Created by Sasha on 3/28/17.
 */
public interface UserService extends UserDetailsService{
    UserResponse register(UserInput user);
    User loadUserByUsername(String username);
}
