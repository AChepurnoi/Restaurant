package com.graniumhub.service.impl;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.dto.dish.DishUpdate;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.filter.OnSaleDishFilter;
import com.graniumhub.data.repository.CategoryRepository;
import com.graniumhub.data.repository.DishRepository;
import com.graniumhub.service.AmazonS3Service;
import com.graniumhub.service.DishService;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 3/28/17.
 */
@Component
public class DishServiceImpl implements DishService {

    private final CategoryRepository categoryRepository;
    private final DishRepository dishRepository;
    private final AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper;
    private final AmazonS3Service amazon;

    @Autowired
    public DishServiceImpl(CategoryRepository categoryRepository, DishRepository dishRepository, AbstractDTOWrapper<DishInput, Dish, DishResponse> wrapper, AmazonS3Service amazon) {
        this.categoryRepository = categoryRepository;
        this.dishRepository = dishRepository;
        this.wrapper = wrapper;
        this.amazon = amazon;
    }

    @Override
    public DishResponse create(DishInput input) {
        Dish dish = wrapper.toEntity(input);
        dish = dishRepository.save(dish);
        return wrapper.toResponse(dish);
    }

    @Override
    public DishResponse setDiscount(int dishId, int discount) {
        Dish dish = dishRepository.findOne(dishId).orElseThrow(NotFound::new);
        dish.setDiscount(discount);
        dish.setSale(discount > 0);
        dish = dishRepository.save(dish);
        return wrapper.toResponse(dish);
    }

    @Override
    public DishResponse update(int id, DishUpdate update) {
        Dish dish = dishRepository.findOne(id).orElseThrow(NotFound::new);
        String url = Optional.ofNullable(update.getImage()).map(amazon::saveImage).orElseGet(dish::getImage);
        Category cat = categoryRepository.findOne(update.getCategoryId()).orElseThrow(NotFound::new);
        dish.setTitle(update.getTitle());
        dish.setDescription(update.getDescription());
        dish.setCategory(cat);
        dish.setPrice(update.getPrice());
        dish.setImage(url);
        dish = dishRepository.save(dish);
        return wrapper.toResponse(dish);
    }

    @Override
    public boolean delete(int i) {
        dishRepository.delete(i);
        return true;
    }

    @Override
    public List<DishResponse> search(String search) {
        return dishRepository.findByTitleLike(search).stream().map(wrapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<DishResponse> findByCategoryId(int id) {
        Category cat = categoryRepository.findOne(id)
                .orElseThrow(NotFound::new);
        List<Dish> dishes = dishRepository.findByCategory(cat);

        return dishes
                .stream()
                .map(wrapper::toResponse)
                .collect(Collectors.toList());


    }

    @Override
    public List<DishResponse> findSales() {
        OnSaleDishFilter filter = new OnSaleDishFilter(true);

        return dishRepository
                .findAll()
                .stream()
                .map(wrapper::toResponse)
                .filter(filter)
                .collect(Collectors.toList());

    }

    @Override
    public Optional<DishResponse> findById(int i) {
        return dishRepository.findOne(i).map(wrapper::toResponse);
    }
}
