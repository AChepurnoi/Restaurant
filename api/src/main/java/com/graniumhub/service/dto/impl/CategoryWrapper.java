package com.graniumhub.service.dto.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.service.dto.AbstractDTOWrapper;
import org.springframework.stereotype.Component;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class CategoryWrapper implements AbstractDTOWrapper<CategoryInput, Category, CategoryResponse>{
    @Override
    public Category toEntity(CategoryInput input) {
        return new Category(0,input.getTitle(),input.getImage(),null);
    }

    @Override
    public CategoryResponse toResponse(Category entity) {
        return new CategoryResponse(entity.getId(),entity.getTitle(),entity.getImage());
    }

    @Override
    public Class<Category> entityClass() {
        return Category.class;
    }

    @Override
    public Class<CategoryInput> inputClass() {
        return CategoryInput.class;
    }

    @Override
    public Class<CategoryResponse> responseClass() {
        return CategoryResponse.class;
    }
}
