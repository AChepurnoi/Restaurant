package com.graniumhub.data.repository;

import com.graniumhub.data.domain.RTable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sasha on 4/6/17.
 */
public interface TableRepository extends JpaRepository<RTable, Integer>{

}
