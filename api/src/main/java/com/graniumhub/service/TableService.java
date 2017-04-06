package com.graniumhub.service;

import com.graniumhub.data.dto.table.TableInput;
import com.graniumhub.data.dto.table.TableResponse;

import java.util.List;

/**
 * Created by Sasha on 4/6/17.
 */
public interface TableService {
    TableResponse place(TableInput input);
    List<TableResponse> findAll();
    boolean remove(int id);
}
