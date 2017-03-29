package com.graniumhub.web;

import com.graniumhub.data.dto.category.CategoryInput;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Sasha on 3/28/17.
 */

@RestController
public class CategoryController {



    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> findAll(){
        List<CategoryResponse> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryResponse> create(CategoryInput input){
        CategoryResponse response = categoryService.create(input);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> findById(@PathVariable int id){
        CategoryResponse response = categoryService.findById(id).orElseThrow(NotFound::new);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity delete(@PathVariable int id){
        boolean result = categoryService.deleteById(id);
        return result ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }


}
