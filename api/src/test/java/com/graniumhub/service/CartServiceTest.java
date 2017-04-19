package com.graniumhub.service;

import com.graniumhub.data.domain.CartItem;
import com.graniumhub.data.dto.cart.CartResponse;
import com.graniumhub.data.dto.order.OrderResponse;
import com.graniumhub.data.repository.CartItemRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.transaction.BeforeTransaction;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Sasha on 4/13/17.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CartServiceTest {

    @Autowired
    private CartService cartService;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void addItemToCart() throws Exception {
        int userId = 5;
        int itemId = 100;

        CartResponse response = cartService.addToCart(userId, itemId);
        assert(response.getCount() == 2);
    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void addFirstItemToCart() throws Exception {
        int userId = 5;
        int itemId = 300;

        CartResponse response = cartService.addToCart(userId, itemId);
        assert(response.getCount() == 1);
    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void deleteFromCart() throws Exception {
        int userId = 5;
        int itemId = 200;

        CartResponse response = cartService.removeFromCart(userId, itemId);
        assert(response.getCount() == 1);

    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void deleteFromCartCompletely() throws Exception {
        int userId = 5;
        int itemId = 100;

        CartResponse response = cartService.removeFromCart(userId, itemId);
        assert(response.getCount() == 0);

    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void loadCart() throws Exception {
        int userId = 5;
        List<CartResponse> cart = cartService.loadCart(5);

        assert(cart.size() == 3);
    }


    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void createOrder(){
        int userId = 5;
        OrderResponse order = cartService.createOrder(userId);
        assert( order.getTotal() == 250);

    }


}
