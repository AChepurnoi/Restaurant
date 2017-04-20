package com.graniumhub.web;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.cart.CartResponse;
import com.graniumhub.data.dto.order.OrderResponse;
import com.graniumhub.service.CartService;
import com.graniumhub.web.security.RequiredUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Sasha on 4/13/17.
 */
@RestController
@CrossOrigin
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @RequiredUser
    @PostMapping("/cart/dish/{dishId}")
    public ResponseEntity<CartResponse> addToCart(@AuthenticationPrincipal User user,
                                                  @PathVariable int dishId) {
        CartResponse response = cartService.addToCart(user.getId(), dishId);
        return ResponseEntity.ok(response);

    }


    @RequiredUser
    @DeleteMapping("/cart/dish/{dishId}")
    public ResponseEntity<CartResponse> deleteFromCart(@AuthenticationPrincipal User user,
                                                       @PathVariable int dishId) {
        CartResponse response = cartService.removeFromCart(user.getId(), dishId);
        return ResponseEntity.ok(response);

    }

    @RequiredUser
    @PostMapping("/cart/order")
    public ResponseEntity<OrderResponse> createOrder(@AuthenticationPrincipal User user){
        OrderResponse order = cartService.createOrder(user.getId());
        return ResponseEntity.ok(order);
    }

    @RequiredUser
    @GetMapping("/cart")
    public ResponseEntity<List<CartResponse>> getCart(@AuthenticationPrincipal User user) {
        List<CartResponse> cart = cartService.loadCart(user.getId());
        return ResponseEntity.ok(cart);

    }

}
