package com.graniumhub.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graniumhub.config.OAuth2ServerConfig;
import com.graniumhub.config.SecurityConfig;
import com.graniumhub.service.UserService;
import lombok.SneakyThrows;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

/**
 * Created by Sasha on 3/30/17.
 */
@RunWith(SpringRunner.class)
@Import(value = {OAuth2ServerConfig.class, SecurityConfig.class})
public abstract class AbstractWebTest {
    @MockBean
    protected DataSource dataSource;

    @Autowired
    protected MockMvc mvc;

    protected ObjectMapper mapper = new Jackson2ObjectMapperBuilder().build();

    @MockBean
    protected UserService userService;


    @SneakyThrows
    protected <T> T parse(MvcResult result, Class<T> tClass){
        return mapper.readValue(result.getResponse().getContentAsString(), tClass);

    }


}
