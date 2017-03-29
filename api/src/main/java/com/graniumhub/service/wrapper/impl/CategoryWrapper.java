package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.service.AmazonS3Service;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class CategoryWrapper implements AbstractDTOWrapper<CategoryInput, Category, CategoryResponse>{

    private final AmazonS3Service amazon;

    @Autowired
    public CategoryWrapper(AmazonS3Service amazon) {
        this.amazon = amazon;
    }

    @SneakyThrows
    @Override
    public Category toEntity(CategoryInput input) {
        MultipartFile image = input.getImage();
        String imageUrl = amazon.saveImage(image.getOriginalFilename(), image.getInputStream());
        return new Category(0,input.getTitle(),imageUrl,null);
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
