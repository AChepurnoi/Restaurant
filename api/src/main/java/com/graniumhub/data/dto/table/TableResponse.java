package com.graniumhub.data.dto.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by Sasha on 4/6/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableResponse {
    private int id;
    private double posx;
    private double posy;

}
