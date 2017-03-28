package com.graniumhub.service.dto.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.repository.CategoryRepository;
import com.graniumhub.service.dto.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class DishWrapper implements AbstractDTOWrapper<DishInput, Dish, DishResponse> {

    private final CategoryRepository categoryRepository;

    @Autowired
    public DishWrapper(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Dish toEntity(DishInput input) {
        Category category = categoryRepository.findOne(input.getCategoryId()).orElseThrow(RuntimeException::new);
        return new Dish(0, input.getTitle(),input.getDescription(),input.getImage(),category);
    }

    @Override
    public DishResponse toResponse(Dish entity) {
        return new DishResponse(entity.getId(),entity.getTitle(),entity.getDescription(),entity.getImage());
    }

    @Override
    public Class<Dish> entityClass() {
        return Dish.class;
    }

    @Override
    public Class<DishInput> inputClass() {
        return DishInput.class;
    }

    @Override
    public Class<DishResponse> responseClass() {
        return DishResponse.class;
    }
}
