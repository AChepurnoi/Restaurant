package com.graniumhub.data.repository;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.domain.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface DishRepository extends JpaRepository<Dish,Integer> {
    List<Dish> findByTitleLike(String search);
    Optional<Dish> findOne(int id);
    List<Dish> findByCategory(Category category);
}
