package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.CartItem;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.dto.cart.CartResponse;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import com.graniumhub.service.wrapper.ResponseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Sasha on 4/13/17.
 */
@Component
public class CartItemResponseConverter implements ResponseConverter<CartItem, CartResponse> {

    private final AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper;

    @Autowired
    public CartItemResponseConverter(AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper) {
        this.wrapper = wrapper;
    }

    @Override
    public CartResponse convert(CartItem input) {
        DishResponse dish = wrapper.toResponse(input.getDish());
        return new CartResponse(dish, input.getCount());
    }
}
