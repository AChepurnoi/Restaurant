package com.graniumhub.web;

import com.graniumhub.data.dto.dish.DiscountInput;
import com.graniumhub.data.dto.dish.DishInput;
import com.graniumhub.data.dto.dish.DishResponse;
import com.graniumhub.data.dto.dish.DishUpdate;
import com.graniumhub.data.exception.InvalidInputException;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.filter.OnSaleDishFilter;
import com.graniumhub.service.DishService;
import com.graniumhub.web.security.RequiredAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 3/28/17.
 */
@RestController
@CrossOrigin
public class DishController {

    private final DishService service;

    @Autowired
    public DishController(DishService service) {
        this.service = service;
    }


    @GetMapping(value = "/sales")
    public ResponseEntity<List<DishResponse>> sales() {
        List<DishResponse> sales = service.findSales();
        return ResponseEntity.ok(sales);
    }

    @RequiredAdmin
    @PostMapping(value = "/dishes")
    public ResponseEntity<DishResponse> create(@Valid DishInput input,
                                               BindingResult params) {
        if (params.hasErrors()) throw new InvalidInputException(params.getFieldErrors());
        DishResponse response = service.create(input);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/dishes")
    public ResponseEntity<List<DishResponse>> findAll() {
        List<DishResponse> response = service.findAll();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/dishes/{id}")
    public ResponseEntity<DishResponse> findOne(@PathVariable("id") int id) {
        DishResponse response = service.findOne(id).orElseThrow(NotFound::new);
        return ResponseEntity.ok(response);
    }


    @RequiredAdmin
    @DeleteMapping(value = "/dishes/{id}")
    public ResponseEntity<Object> delete(@PathVariable int id) {
        boolean result = service.delete(id);
        return result ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @RequiredAdmin
    @PutMapping(value = "/dishes/{id}/discount")
    public ResponseEntity<DishResponse> setDiscount(@PathVariable int id,
                                                    @RequestBody @Valid DiscountInput input,
                                                    BindingResult params) {
        if (params.hasErrors()) throw new InvalidInputException(params.getFieldErrors());
        DishResponse response = service.setDiscount(id, input.getDiscount());
        return ResponseEntity.ok(response);
    }

    @RequiredAdmin
    @PostMapping(value = "/dishes/{id}")
    public ResponseEntity<DishResponse> update(@PathVariable("id") int id,
                                               @Valid DishUpdate update) {
        DishResponse response = service.update(id, update);
        return ResponseEntity.ok(response);
    }


    @GetMapping(value = "/dishes/search")
    public ResponseEntity<List<DishResponse>> search(@RequestParam(name = "query") String query) {
        List<DishResponse> result = service.search(query);
        return ResponseEntity.ok(result);

    }

    @GetMapping(value = "/categories/{id}/dishes")
    public ResponseEntity<List<DishResponse>> findByCategory(
            @PathVariable int id,
            OnSaleDishFilter dishFilter) {

        List<DishResponse> dishes = service.findByCategoryId(id);
        dishes = dishes.stream()
                .filter(dishFilter)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dishes);
    }

}
