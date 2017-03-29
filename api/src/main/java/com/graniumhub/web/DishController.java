package com.graniumhub.web;

import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Sasha on 3/28/17.
 */
@RestController
public class DishController {

    private final DishService service;

    @Autowired
    public DishController(DishService service) {
        this.service = service;
    }

    @PostMapping(value = "/dishes")
    public ResponseEntity<DishResponse> create(DishInput input){
        DishResponse response = service.create(input);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/dishes/{id}")
    public ResponseEntity<Object> delete(@PathVariable int id){
        boolean result = service.delete(id);
        return result ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/categories/{id}/dishes")
    public ResponseEntity<List<DishResponse>> findByCategory(@PathVariable int id){
        List<DishResponse> dishes = service.findByCategoryId(id);
        return ResponseEntity.ok(dishes);
    }

}
