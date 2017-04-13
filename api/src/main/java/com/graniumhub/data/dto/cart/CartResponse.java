package com.graniumhub.data.dto.cart;

import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonUnwrapped;

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
