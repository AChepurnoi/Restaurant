package com.graniumhub.data.dto.dish;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

/**
 * Created by Sasha on 3/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DishInput {

    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private MultipartFile image;
    private int categoryId;

    private int price;

}
