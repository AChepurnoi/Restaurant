package com.graniumhub.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graniumhub.SpringBootApp;
import com.graniumhub.WithMockCustomUser;
import com.graniumhub.WithMockCustomUserSecurityContextFactory;
import com.graniumhub.config.OAuth2ServerConfig;
import com.graniumhub.config.SecurityConfig;
import com.graniumhub.service.UserService;
import lombok.SneakyThrows;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.PrintingResultHandler;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.sql.DataSource;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

/**
 * Created by Sasha on 3/30/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public abstract class AbstractWebTest {


    @Autowired
    private WebApplicationContext wac;


    protected MockMvc mvc;

    protected ObjectMapper mapper = new Jackson2ObjectMapperBuilder().build();

    @MockBean
    protected UserService userService;

    @Before
    public void setUp() throws Exception {
        mvc = MockMvcBuilders.webAppContextSetup(wac).alwaysDo(print()).build();
    }

    @SneakyThrows
    protected <T> T parse(MvcResult result, Class<T> tClass){
        return mapper.readValue(result.getResponse().getContentAsString(), tClass);

    }


}
