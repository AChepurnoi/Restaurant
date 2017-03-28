package com.graniumhub.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graniumhub.config.OAuth2ServerConfig;
import com.graniumhub.config.SecurityConfig;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.service.DishService;
import com.graniumhub.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Sasha on 3/29/17.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@Import(value = {OAuth2ServerConfig.class, SecurityConfig.class})
public class DishControllerTest {

    @Autowired
    private MockMvc mvc;

    private ObjectMapper mapper = new Jackson2ObjectMapperBuilder().build();

    @MockBean
    private DataSource dataSource;
    @MockBean
    private DishService dishService;




}
