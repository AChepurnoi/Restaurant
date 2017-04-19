package com.graniumhub.data.repository;

import com.graniumhub.data.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sasha on 4/20/17.
 */

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
