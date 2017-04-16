package com.graniumhub.data.filter;

import com.graniumhub.data.dto.dish.DishResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.function.Predicate;

/**
 * Created by Sasha on 4/16/17.
 */
@Data
@NoArgsConstructor
public class OnSaleDishFilter implements Predicate<DishResponse> {
    private boolean sale;

    @Override
    public boolean test(DishResponse dishResponse) {
        //If sale = true, then filter should be applied, else return !sale (always true)
        return !sale || dishResponse.isSale();
    }
}
