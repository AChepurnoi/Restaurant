package com.graniumhub.service;

import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.dto.dish.DishUpdate;

import java.util.List;
import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface DishService {
    DishResponse create(DishInput input);

    boolean delete(int i);

    DishResponse setDiscount(int dishId, int discount);

    DishResponse update(int id, DishUpdate update);

    List<DishResponse> search(String search);

    Optional<DishResponse> findById(int i);

    List<DishResponse> findByCategoryId(int id);

    List<DishResponse> findSales();

    List<DishResponse> findAll();

    Optional<DishResponse> findOne(int id);
}
