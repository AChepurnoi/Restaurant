package com.graniumhub.service;

import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.data.dto.category.CategoryUpdate;
import com.graniumhub.data.dto.dish.DishResponse;

import java.util.List;
import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface CategoryService {
    CategoryResponse create(CategoryInput input);

    List<CategoryResponse> findAll();

    List<CategoryResponse> search(String search);

    CategoryResponse update(int id, CategoryUpdate update);

    boolean deleteById(int id);

    Optional<CategoryResponse> findById(int id);
}
