package com.graniumhub.web;

import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.service.CategoryService;
import org.junit.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.reset;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Sasha on 3/30/17.
 */

public class CategoryControllerTest extends AbstractWebTest {

    @MockBean
    private CategoryService categoryService;

    @Test
    public void createCategory() throws Exception {
        MockMultipartFile mock = new MockMultipartFile("image", "hello".getBytes());
        CategoryInput input = new CategoryInput("Title", mock);
        given(categoryService.create(input))
                .willReturn(new CategoryResponse(5, "Title", "url"));

        MvcResult result = this.mvc.perform(
                fileUpload("/categories")
                        .file(mock)
                        .param("title", "Title"))
                .andExpect(status().isOk())
                .andReturn();

        CategoryResponse response = parse(result, CategoryResponse.class);
        assert (response.getId() == 5);

    }

    @Test
    public void deleteCategory() throws Exception {

        given(this.categoryService.deleteById(1))
                .willReturn(true);
        this.mvc.perform(delete("/categories/1"))
                .andExpect(status().isOk());

    }

    @Test
    public void findById() throws Exception {

        given(this.categoryService.findById(1))
                .willReturn(Optional.of(new CategoryResponse(1, "Title", "url")));

        MvcResult result = this.mvc
                .perform(get("/categories/1"))
                .andExpect(status().isOk())
                .andReturn();

        CategoryResponse response = parse(result, CategoryResponse.class);
        assert (response.getId() == 1);


    }

    @Test
    public void findAll() throws Exception {

        given(this.categoryService.findAll()).willReturn(Collections.emptyList());

        MvcResult result = this.mvc
                .perform(get("/categories"))
                .andExpect(status().isOk())
                .andReturn();

        List response = parse(result, List.class);
        assert (response.isEmpty());
    }
}
