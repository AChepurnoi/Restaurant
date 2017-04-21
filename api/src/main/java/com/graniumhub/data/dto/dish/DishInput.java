package com.graniumhub.data.dto.dish;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Sasha on 3/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DishInput {

    @NotNull
    @Size(min = 2, max = 30)
    private String title;
    @NotNull
    @Size(min = 2, max = 30)
    private String description;
    @NotNull
    private MultipartFile image;
    @NotNull
    private int categoryId;

    @NotNull
    @Min(0)
    private int price;

}
