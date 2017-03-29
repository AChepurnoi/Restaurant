package com.graniumhub.service;

import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.service.CategoryService;
import com.graniumhub.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;

/**
 * Created by Sasha on 3/28/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CategoryServiceTest{

    @Autowired
    private CategoryService categoryService;

    @MockBean
    private AmazonS3Service amazon;


    @Before
    public void setUp() throws Exception {

        given(amazon.saveImage(any(String.class), any(InputStream.class)))
                .willReturn("fileobject.png");
    }

    @Test
    public void createCategory() throws Exception {
        MultipartFile file = new MockMultipartFile("Test", "Helloworld".getBytes());

        CategoryInput input = new CategoryInput("Title",file);
        CategoryResponse response = categoryService.create(input);

        assert (response != null);
        assert (response.getTitle().equals("Title"));
    }



    @Test(expected = Exception.class)
    public void createInvalidCategory() throws Exception {
        CategoryInput input = new CategoryInput();
        CategoryResponse response = categoryService.create(input);
    }

    @Test
    public void findAll() throws Exception {
        List<CategoryResponse> list = categoryService.findAll();
        assert(list.size() == 0);
        createCategory();
        list = categoryService.findAll();
        assert(list.size() == 1);
    }


    @Test
    public void deleteCategory() throws Exception {
        MultipartFile file = new MockMultipartFile("Test", "Helloworld".getBytes());

        CategoryInput input = new CategoryInput("Title",file);
        CategoryResponse response = categoryService.create(input);
        assert (response != null);
        categoryService.deleteById(response.getId());
        Optional<CategoryResponse> deleted = categoryService.findById(response.getId());
        assert (!deleted.isPresent());
    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void deleteCategoryWithDishes() throws Exception {
        categoryService.deleteById(100);
        Optional<CategoryResponse> deleted = categoryService.findById(100);
        assert (!deleted.isPresent());
    }



}
