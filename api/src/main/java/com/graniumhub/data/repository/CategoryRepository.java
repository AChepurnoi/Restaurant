package com.graniumhub.data.repository;

import com.graniumhub.data.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByTitleLike(String search);
    Optional<Category> findOne(int id);
}
