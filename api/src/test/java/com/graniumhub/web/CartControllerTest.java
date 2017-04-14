package com.graniumhub.web;

import com.graniumhub.WithMockCustomUser;
import com.graniumhub.WithMockCustomUserSecurityContextFactory;
import com.graniumhub.service.CartService;
import org.junit.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Sasha on 4/14/17.
 */
@WebMvcTest(CartController.class)
@Import(value = {WithMockCustomUserSecurityContextFactory.class})
@ContextConfiguration
public class CartControllerTest extends AbstractWebTest {

    @MockBean
    private CartService cartService;


    @Test
    @WithMockCustomUser
    public void ExampleTest() throws Exception {
        this.mvc.perform(
                post("/cart/dish/5"))
                .andExpect(status().isOk());


    }
}
