package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.RTable;
import com.graniumhub.data.dto.table.TableInput;
import com.graniumhub.data.dto.table.TableResponse;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Created by Sasha on 4/6/17.
 */
@Component
public class TableWrapper implements AbstractDTOWrapper<TableInput, RTable, TableResponse> {

    @Override
    public RTable toEntity(TableInput input) {
        return new RTable(0,input.getPosx(), input.getPosy(), Collections.emptyList());
    }

    @Override
    public TableResponse toResponse(RTable entity) {
        return new TableResponse(entity.getId(),entity.getPosx(), entity.getPosy());
    }

    @Override
    public Class<RTable> entityClass() {
        return RTable.class;
    }

    @Override
    public Class<TableInput> inputClass() {
        return TableInput.class;
    }

    @Override
    public Class<TableResponse> responseClass() {
        return TableResponse.class;
    }
}
