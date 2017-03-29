package com.graniumhub.service.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.repository.CategoryRepository;
import com.graniumhub.data.repository.DishRepository;
import com.graniumhub.service.DishService;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class DishServiceImpl implements DishService {

    private final CategoryRepository categoryRepository;
    private final DishRepository dishRepository;
    private final AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper;

    @Autowired
    public DishServiceImpl(CategoryRepository categoryRepository, DishRepository dishRepository, AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper) {
        this.categoryRepository = categoryRepository;
        this.dishRepository = dishRepository;
        this.wrapper = wrapper;
    }

    @Override
    public DishResponse create(DishInput input) {
        Dish dish = wrapper.toEntity(input);
        dish = dishRepository.save(dish);
        return wrapper.toResponse(dish);
    }

    @Override
    public boolean delete(int i) {
        dishRepository.delete(i);
        return true;
    }

    @Override
    public List<DishResponse> findByCategoryId(int id) {
        Category cat = categoryRepository.findOne(id)
                .orElseThrow(NotFound::new);
        List<Dish> dishes = dishRepository.findByCategory(cat);

        return dishes
                .stream()
                .map(wrapper::toResponse)
                .collect(Collectors.toList());


    }

    @Override
    public Optional<DishResponse> findById(int i) {
        return dishRepository.findOne(i).map(wrapper::toResponse);
    }
}
