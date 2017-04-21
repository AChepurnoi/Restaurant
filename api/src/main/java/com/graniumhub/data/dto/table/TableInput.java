package com.graniumhub.data.dto.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

/**
 * Created by Sasha on 4/6/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableInput {

    private double posx;
    private double posy;


}
