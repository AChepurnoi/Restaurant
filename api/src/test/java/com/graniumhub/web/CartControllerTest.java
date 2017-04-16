package com.graniumhub.web;

import com.graniumhub.WithMockCustomUser;
import com.graniumhub.WithMockCustomUserSecurityContextFactory;
import com.graniumhub.data.dto.cart.CartResponse;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.service.CartService;
import org.junit.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Sasha on 4/14/17.
 */
public class CartControllerTest extends AbstractWebTest {

    @MockBean
    private CartService cartService;


    @Test
    @WithMockCustomUser(id = 10)
    public void addDishToCartTest() throws Exception {
        int dishId = 5;

        DishResponse response = new DishResponse(dishId, "Title",
                "desc", "img", 1, 0, false, 0);

        given(cartService.addToCart(10, dishId))
                .willReturn(new CartResponse(response, 5));

        MvcResult res = this.mvc.perform(
                post("/cart/dish/5"))
                .andExpect(status().isOk())
                .andReturn();

        DishResponse parsed = parse(res, DishResponse.class);
        assert (parsed.getId() == 5);

    }

    @Test
    @WithMockCustomUser(id = 10)
    public void getCart() throws Exception {

        DishResponse response = new DishResponse(5, "Title",
                "desc", "img", 1,
                0, false, 0 );

        given(cartService.loadCart(10))
                .willReturn(Collections.singletonList(new CartResponse(response, 5)));

        MvcResult res = this.mvc.perform(
                get("/cart"))
                .andExpect(status().isOk())
                .andReturn();

        List parsed = parse(res, List.class);
        assert (parsed.size() == 1);
    }

    @Test
    @WithMockCustomUser(id = 10)
    public void deleteFromCart() throws Exception {

        int dishId = 5;
        DishResponse response = new DishResponse(dishId, "Title",
                "desc", "img", 1, 0, false , 0);

        given(cartService.removeFromCart(10, dishId))
                .willReturn((new CartResponse(response, 1)));

        MvcResult res = this.mvc.perform(
                delete("/cart/dish/" + dishId ))
                .andExpect(status().isOk())
                .andReturn();

        DishResponse parsed = parse(res, DishResponse.class);
        assert (parsed.getId() == 5);
    }

}
