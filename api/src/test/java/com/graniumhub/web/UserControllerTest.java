package com.graniumhub.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graniumhub.config.OAuth2ServerConfig;
import com.graniumhub.config.SecurityConfig;
import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.service.UserService;
import org.junit.Test;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.*;
import org.junit.runner.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
/**
 * Created by Sasha on 3/28/17.
 */

public class UserControllerTest extends AbstractWebTest {


    @Test
    public void registerUser() throws Exception {
        UserInput input = new UserInput("login","password","email");
        String json = mapper.writeValueAsString(input);
        given(this.userService.register(input))
                .willReturn(new UserResponse(5,"login", "email",false));

        MvcResult result = this.mvc
                .perform(post("/users")
                .content(json)
                .header("Content-type",MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        UserResponse response = parse(result, UserResponse.class);
        assert (response.getId() == 5);
    }

    @Test
    public void findUser() throws Exception {
        String username = "Ivan";

        given(this.userService.loadByUsername(username))
                .willReturn(Optional.of(new UserResponse(5,"Ivan", "email",false)));
        MvcResult result = this.mvc
                .perform(get("/users/" + username)
                .header("Content-type",MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        UserResponse response = parse(result, UserResponse.class);
        assert (response.getId() == 5);
    }

    @Test
    public void findUserUnknown() throws Exception {
        String username = "Ivan";

        given(this.userService.loadByUsername(username))
                .willReturn(Optional.empty());
        this.mvc.perform(get("/users/" + username)
                .header("Content-type",MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }




}
