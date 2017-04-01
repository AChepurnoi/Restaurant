package com.graniumhub.service;

import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.service.DishService;
import org.junit.Before;
import org.junit.Ignore;
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
import static org.mockito.Mockito.when;

/**
 * Created by Sasha on 3/28/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class DishServiceTest {

    @Autowired
    private DishService dishService;

    @MockBean
    private AmazonS3Service amazon;


    @Before
    public void setUp() throws Exception {
        given(amazon.saveImage(any(String.class), any(InputStream.class)))
                .willReturn("fileobject.png");

    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void createDish() {
        MultipartFile file = new MockMultipartFile("Test", "Helloworld".getBytes());

        DishInput input = new DishInput("title", "desc", file,100);
        DishResponse response = dishService.create(input);
        assert (response != null);
    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void deleteDish() throws Exception {
        dishService.delete(100);
        Optional<DishResponse> dish = dishService.findById(100);
        assert (!dish.isPresent());
    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void findByCategoryId() throws Exception {
        List<DishResponse> dishes = dishService.findByCategoryId(100);
        assert (dishes.size() == 3);
    }

    @Test(expected = NotFound.class)
    @Sql(scripts = "classpath:data/data.sql")
    public void findByUnknownCategory() throws Exception {
        List<DishResponse> dishes = dishService.findByCategoryId(500);
    }


}
