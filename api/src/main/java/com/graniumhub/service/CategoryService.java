package com.graniumhub.service;

import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;

import java.util.List;
import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface CategoryService {
    CategoryResponse create(CategoryInput input);

    List<CategoryResponse> findAll();

    boolean deleteById(int id);

    Optional<CategoryResponse> findById(int id);
}
