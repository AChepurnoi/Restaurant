package com.graniumhub.data.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by Sasha on 4/20/17.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private int id;
    private int userId;
    private List<OrderItemResponse> items;
    private int total;

}
