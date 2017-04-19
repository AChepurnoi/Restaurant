package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.Order;
import com.graniumhub.data.domain.OrderItem;
import com.graniumhub.data.dto.order.OrderItemResponse;
import com.graniumhub.data.dto.order.OrderResponse;
import com.graniumhub.service.wrapper.ResponseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Created by Sasha on 4/20/17.
 */
@Component
public class OrderConverter implements ResponseConverter<Order, OrderResponse> {


    private final ResponseConverter<OrderItem, OrderItemResponse> itemConverter;

    @Autowired
    public OrderConverter(ResponseConverter<OrderItem, OrderItemResponse> itemConverter) {
        this.itemConverter = itemConverter;
    }

    @Override
    public OrderResponse convert(Order input) {
        return OrderResponse
                .builder()
                .id(input.getId())
                .userId(input.getUser().getId())
                .items(input
                        .getItems()
                        .stream()
                        .map(itemConverter::convert)
                        .collect(Collectors.toList()))
                .total(input.getTotal())
                .build();

    }
}
