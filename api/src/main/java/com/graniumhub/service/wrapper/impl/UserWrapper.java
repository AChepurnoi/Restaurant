package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.Order;
import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.order.OrderResponse;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import com.graniumhub.service.wrapper.ResponseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class UserWrapper implements AbstractDTOWrapper<UserInput, User, UserResponse> {
    private final BCryptPasswordEncoder encoder;
    private final ResponseConverter<Order, OrderResponse> orderConverter;
    @Autowired
    public UserWrapper(BCryptPasswordEncoder encoder, ResponseConverter<Order, OrderResponse> orderConverter) {
        this.encoder = encoder;
        this.orderConverter = orderConverter;
    }


    @Override
    public User toEntity(UserInput input) {

        return User.builder()
                .id(0)
                .login(input.getLogin())
                .password(encoder.encode(input.getPassword()))
                .email(input.getEmail())
                .phone(input.getPhone())
                .admin(true)
                .orders(Collections.emptyList())
                .cartItems(Collections.emptyList())
                .build();
    }

    @Override
    public UserResponse toResponse(User entity) {
        return UserResponse
                .builder()
                .id(entity.getId())
                .login(entity.getLogin())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .admin(entity.isAdmin())
                .orders(entity
                        .getOrders()
                        .stream()
                        .map(orderConverter::convert)
                        .collect(Collectors.toList()))
                .build();
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
