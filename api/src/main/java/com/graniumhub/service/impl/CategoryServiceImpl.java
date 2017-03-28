package com.graniumhub.service.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.data.repository.CategoryRepository;
import com.graniumhub.service.CategoryService;
import com.graniumhub.service.dto.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final AbstractDTOWrapper<CategoryInput,Category,CategoryResponse> wrapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository repository, AbstractDTOWrapper<CategoryInput, Category, CategoryResponse> wrapper) {
        this.repository = repository;
        this.wrapper = wrapper;
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
    public void deleteById(int id) {
        repository.delete(id);
    }

    @Override
    public Optional<CategoryResponse> findById(int id) {
        return repository
                .findOne(id)
                .map(wrapper::toResponse);
    }
}
