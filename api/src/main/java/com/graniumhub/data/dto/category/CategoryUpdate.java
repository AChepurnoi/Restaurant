package com.graniumhub.data.dto.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Sasha on 5/28/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryUpdate {

    @NotNull
    @Size(min = 2, max = 30)
    private String title;
    private MultipartFile image;
}
