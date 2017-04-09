package com.graniumhub.data.repository;

import com.graniumhub.data.domain.Category;
import com.graniumhub.data.domain.RTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by Sasha on 4/6/17.
 */
public interface TableRepository extends JpaRepository<RTable, Integer>{
    Optional<RTable> findOne(int id);
}
