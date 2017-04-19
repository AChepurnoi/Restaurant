package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.domain.OrderItem;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.dto.order.OrderItemResponse;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import com.graniumhub.service.wrapper.ResponseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Sasha on 4/20/17.
 */
@Component
public class OrderItemConverter implements ResponseConverter<OrderItem, OrderItemResponse> {

    private final AbstractDTOWrapper<DishInput, Dish, DishResponse> dishWrapper;

    @Autowired
    public OrderItemConverter(AbstractDTOWrapper<DishInput, Dish, DishResponse> dishWrapper) {
        this.dishWrapper = dishWrapper;
    }

    @Override
    public OrderItemResponse convert(OrderItem input) {
        return OrderItemResponse
                .builder()
                .dish(dishWrapper.toResponse(input.getDish()))
                .count(input.getCount())
                .build();
    }
}
