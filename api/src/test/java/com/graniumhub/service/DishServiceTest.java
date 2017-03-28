package com.graniumhub.service;

import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.service.DishService;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class DishServiceTest {
    @Autowired
    private DishService dishService;

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void createDish() {
        DishInput input = new DishInput("title","desc","image", 100);
        DishResponse response = dishService.create(input);
        assert (response != null);
    }

    @Test
    @Sql(scripts = "classpath:data/data.sql")
    public void deleteDish() throws Exception {
        dishService.delete(100);
        Optional<DishResponse> dish = dishService.findById(100);
        assert(!dish.isPresent());
    }
}
