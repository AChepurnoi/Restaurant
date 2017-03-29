package com.graniumhub.data.dto.category;

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
public class CategoryInput {

    private String title;
    private MultipartFile image;
}
