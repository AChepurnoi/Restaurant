package com.graniumhub.service.impl;

import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.repository.DishRepository;
import com.graniumhub.service.DishService;
import com.graniumhub.service.dto.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class DishServiceImpl implements DishService {

    private final DishRepository dishRepository;
    private final AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper;

    @Autowired
    public DishServiceImpl(DishRepository dishRepository, AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper) {
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
    public void delete(int i) {
        dishRepository.delete(i);
    }

    @Override
    public Optional<DishResponse> findById(int i) {
        return dishRepository.findOne(i).map(wrapper::toResponse);
    }
}
