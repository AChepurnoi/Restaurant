package com.graniumhub.data.dto.dish;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by Sasha on 3/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DishResponse {

    private int id;
    private String title;
    private String description;
    private String image;
    private int categoryId;
    private int price;
    private boolean sale;
    private int discount;
}
