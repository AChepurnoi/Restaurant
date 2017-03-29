package com.graniumhub.service;

import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;

import java.util.List;
import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface DishService {
    DishResponse create(DishInput input);

    boolean delete(int i);

    Optional<DishResponse> findById(int i);

    List<DishResponse> findByCategoryId(int id);
}
