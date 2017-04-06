package com.graniumhub.service.impl;

import com.graniumhub.data.domain.RTable;
import com.graniumhub.data.dto.table.TableInput;
import com.graniumhub.data.dto.table.TableResponse;
import com.graniumhub.data.repository.TableRepository;
import com.graniumhub.service.TableService;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 4/6/17.
 */
@Service
public class TableServiceImpl implements TableService {

    private final TableRepository tableRepository;

    private final AbstractDTOWrapper<TableInput, RTable, TableResponse> wrapper;

    @Autowired
    public TableServiceImpl(TableRepository tableRepository, AbstractDTOWrapper<TableInput, RTable, TableResponse> wrapper) {
        this.tableRepository = tableRepository;
        this.wrapper = wrapper;
    }

    @Override
    public TableResponse place(TableInput input) {
        RTable table = wrapper.toEntity(input);
        table = tableRepository.save(table);
        return wrapper.toResponse(table);
    }

    @Override
    public List<TableResponse> findAll() {
        return tableRepository.findAll().stream()
                .map(wrapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public boolean remove(int id) {
        tableRepository.delete(id);
        return true;
    }
}
