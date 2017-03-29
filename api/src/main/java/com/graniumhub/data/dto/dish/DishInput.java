package com.graniumhub.data.dto.dish;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Sasha on 3/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DishInput {

    private String title;
    private String description;
    private MultipartFile image;
    private int categoryId;

}
