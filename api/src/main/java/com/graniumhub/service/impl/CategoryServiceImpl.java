package com.graniumhub.service.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.data.dto.category.CategoryUpdate;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.repository.CategoryRepository;
import com.graniumhub.service.AmazonS3Service;
import com.graniumhub.service.CategoryService;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final AbstractDTOWrapper<CategoryInput, Category, CategoryResponse> wrapper;
    private final AmazonS3Service amazon;

    @Autowired
    public CategoryServiceImpl(CategoryRepository repository, AbstractDTOWrapper<CategoryInput, Category, CategoryResponse> wrapper, AmazonS3Service amazon) {
        this.repository = repository;
        this.wrapper = wrapper;
        this.amazon = amazon;
    }

    @Override
    public CategoryResponse create(CategoryInput input) {
        Category category = wrapper.toEntity(input);
        category = repository.save(category);
        return wrapper.toResponse(category);
    }

    @Override
    public List<CategoryResponse> findAll() {
        return repository
                .findAll()
                .stream()
                .map(wrapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryResponse> search(String search) {
        return repository.findByTitleLike(search)
                .stream()
                .map(wrapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse update(int id, CategoryUpdate update) {
        Category category = repository.findOne(id).orElseThrow(NotFound::new);
        String url = Optional.ofNullable(update.getImage())
                .map(amazon::saveImage).orElseGet(category::getImage);

        category.setTitle(update.getTitle());
        category.setImage(url);
        category = repository.save(category);

        return wrapper.toResponse(category);
    }

    @Override
    public boolean deleteById(int id) {
        repository.delete(id);
        return true;
    }

    @Override
    public Optional<CategoryResponse> findById(int id) {
        return repository
                .findOne(id)
                .map(wrapper::toResponse);
    }
}
