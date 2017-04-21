package com.graniumhub.data.dto.dish;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * Created by Sasha on 4/18/17.
 */
@Data
public class DiscountInput {

    @NotNull
    @Min(0)
    @Max(99)
    private int discount;
}
