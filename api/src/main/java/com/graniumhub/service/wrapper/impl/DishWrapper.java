package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.repository.CategoryRepository;
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
public class DishWrapper implements AbstractDTOWrapper<DishInput, Dish, DishResponse> {

    private final CategoryRepository categoryRepository;
    private final AmazonS3Service amazon;

    @Autowired
    public DishWrapper(CategoryRepository categoryRepository, AmazonS3Service amazon) {
        this.categoryRepository = categoryRepository;
        this.amazon = amazon;
    }

    @SneakyThrows
    @Override
    public Dish toEntity(DishInput input) {
        MultipartFile image = input.getImage();
        String imageUrl = amazon.saveImage(image.getOriginalFilename(), image.getInputStream());
        Category category = categoryRepository.findOne(input.getCategoryId()).orElseThrow(RuntimeException::new);
        return new Dish(0, input.getTitle(),input.getDescription(),imageUrl,category);
    }

    @Override
    public DishResponse toResponse(Dish entity) {
        return new DishResponse(entity.getId(),entity.getTitle(),entity.getDescription(),entity.getImage(),entity.getCategory().getId());
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
