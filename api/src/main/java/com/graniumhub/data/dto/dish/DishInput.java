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
public class DishInput {

    private String title;
    private String description;
    private String image;
    private int categoryId;

}
