package com.graniumhub.data.repository;

import com.graniumhub.data.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Sasha on 4/13/17.
 */
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

}
