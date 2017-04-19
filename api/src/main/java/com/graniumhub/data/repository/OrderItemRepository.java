package com.graniumhub.data.repository;

import com.graniumhub.data.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sasha on 4/20/17.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

}
