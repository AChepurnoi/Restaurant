package com.graniumhub.data.dto.category;

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
public class CategoryInput {

    @NotNull
    private String title;
    @NotNull
    private MultipartFile image;
}
