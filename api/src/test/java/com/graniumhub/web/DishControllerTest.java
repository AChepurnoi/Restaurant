package com.graniumhub.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graniumhub.config.OAuth2ServerConfig;
import com.graniumhub.config.SecurityConfig;
import com.graniumhub.data.domain.Category;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;

import java.util.Collections;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Matchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Sasha on 3/29/17.
 */


public class DishControllerTest extends AbstractWebTest {

    @MockBean
    private DishService dishService;

    @Test
    public void createDish() throws Exception {
        MockMultipartFile file = new MockMultipartFile("image", "Helloworld".getBytes());
        DishInput input = new DishInput("Title", "Testdc", file, 100);

        given(this.dishService.create(input))
                .willReturn(new DishResponse(5, "Test", "Test", "imageurl",5));

        MvcResult result = this.mvc.perform(
                fileUpload("/dishes")
                        .file(file)
                        .param("title", "Title")
                        .param("description", "Testdc")
                        .param("categoryId", "100")
                        .header("Content-type", MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        DishResponse response = parse(result, DishResponse.class);
        assert (response.getId() == 5);


    }

    @Test
    public void deleteDish() throws Exception {

        given(this.dishService.delete(1))
                .willReturn(true);

        this.mvc.perform(delete("/dishes/1"))
                .andExpect(status().isOk()).andReturn();


    }

    @Test
    public void findByCategoryId() throws Exception {
        given(this.dishService.findByCategoryId(5)).willReturn(Collections.emptyList());
        MvcResult result = this.mvc
                .perform(get("/categories/5/dishes"))
                .andExpect(status().isOk())
                .andReturn();
        List response = parse(result, List.class);
        assert (response.isEmpty());

    }
}
