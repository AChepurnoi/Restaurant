package com.graniumhub.service.impl;

import com.graniumhub.data.domain.CartItem;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.cart.CartResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.repository.CartItemRepository;
import com.graniumhub.data.repository.DishRepository;
import com.graniumhub.data.repository.UserRepository;
import com.graniumhub.service.CartService;
import com.graniumhub.service.wrapper.ResponseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 4/13/17.
 */
@Component
public class CartServiceImpl implements CartService {


    private final UserRepository userRepository;
    private final CartItemRepository cartRepository;
    private final DishRepository dishRepository;
    private final ResponseConverter<CartItem, CartResponse> cartItemConverter;

    @Autowired
    public CartServiceImpl(UserRepository userRepository, CartItemRepository cartRepository, DishRepository dishRepository, ResponseConverter<CartItem, CartResponse> cartItemConverter) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.dishRepository = dishRepository;
        this.cartItemConverter = cartItemConverter;
    }

    @Override
    public CartResponse addToCart(int userId, int itemId) {
        User user = userRepository.findOne(userId).orElseThrow(NotFound::new);
        Dish dish = dishRepository.findOne(itemId).orElseThrow(NotFound::new);
        List<CartItem> cart = user.getCartItems();
        CartItem item = cart.stream()
                .filter(cartItem -> cartItem.getDish().equals(dish))
                .findAny()
                .orElse(new CartItem(0,user,dish,0));
        item.setCount(item.getCount() + 1);
        item = cartRepository.save(item);
        return cartItemConverter.convert(item);

    }

    @Override
    public CartResponse removeFromCart(int userId, int itemId) {
        User user = userRepository.findOne(userId).orElseThrow(NotFound::new);
        Dish dish = dishRepository.findOne(itemId).orElseThrow(NotFound::new);
        List<CartItem> cart = user.getCartItems();
        CartItem item = cart.stream()
                .filter(cartItem -> cartItem.getDish().equals(dish))
                .findAny()
                .orElseThrow(NotFound::new);
        item.setCount(item.getCount() - 1);

        if(item.getCount() < 1) cartRepository.delete(item.getId());
        else item = cartRepository.save(item);

        return cartItemConverter.convert(item);

    }

    @Override
    public List<CartResponse> loadCart(int userId) {
        User user = userRepository.findOne(userId).orElseThrow(NotFound::new);
        return user.getCartItems().stream()
                .map(cartItemConverter::convert)
                .collect(Collectors.toList());
    }
}
