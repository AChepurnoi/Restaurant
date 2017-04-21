package com.graniumhub.service.impl;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.data.exception.ServerException;
import com.graniumhub.data.repository.UserRepository;
import com.graniumhub.service.UserService;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
@Service
public class UserServiceImpl implements UserService {

    private UserRepository repository;
    private final AbstractDTOWrapper<UserInput,User,UserResponse> wrapper;
    @Autowired
    public UserServiceImpl(UserRepository repository, AbstractDTOWrapper<UserInput, User, UserResponse> wrapper) {
        this.repository = repository;
        this.wrapper = wrapper;
    }

    @Override
    public UserResponse register(UserInput user) {
        Optional<User> oldUser = repository.findByLogin(user.getLogin());
        if(oldUser.isPresent()) throw new ServerException("User login duplicated");

        User userNew = wrapper.toEntity(user);
        userNew = repository.save(userNew);
        return wrapper.toResponse(userNew);
    }

    @Override
    public User loadUserByUsername(String username) {
        Optional<User> user = repository.findByLogin(username);
        return user.orElseThrow(() -> new UsernameNotFoundException("No user"));
    }

    @Override
    public Optional<UserResponse> loadByUsername(String username) {
        Optional<User> user = repository.findByLogin(username);
        return user.map(wrapper::toResponse);
    }
}
