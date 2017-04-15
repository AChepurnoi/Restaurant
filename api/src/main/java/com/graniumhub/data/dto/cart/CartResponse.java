package com.graniumhub.data.dto.cart;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by Sasha on 4/13/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {

    @JsonUnwrapped
    private DishResponse dish;

    private int count;
}
