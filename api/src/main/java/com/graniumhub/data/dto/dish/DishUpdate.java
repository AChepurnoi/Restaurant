package com.graniumhub.data.dto.dish;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Sasha on 5/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DishUpdate {

    @Size(min = 2, max = 30)
    private String title;

    @Size(min = 2, max = 30)
    private String description;

    private MultipartFile image;

    @NotNull
    private Integer categoryId;

    @Min(0)
    @NotNull
    private Integer price;

}
