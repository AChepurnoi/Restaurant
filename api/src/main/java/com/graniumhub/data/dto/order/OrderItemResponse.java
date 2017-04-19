package com.graniumhub.data.dto.order;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.graniumhub.data.domain.Dish;
import com.graniumhub.data.domain.Order;
import com.graniumhub.data.dto.dish.DishResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * Created by Sasha on 4/20/17.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {

    @JsonUnwrapped
    private DishResponse dish;
    private int count;



}
