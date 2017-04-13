package com.graniumhub.service;

import com.graniumhub.data.dto.cart.CartResponse;

import java.util.List;

/**
 * Created by Sasha on 4/13/17.
 */
public interface CartService {


    CartResponse addToCart(int userId, int itemId);

    CartResponse removeFromCart(int userId, int itemId);

    List<CartResponse> loadCart(int userId);
}
