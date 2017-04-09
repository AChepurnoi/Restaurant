package com.graniumhub.service.impl;

import com.graniumhub.data.domain.Booking;
import com.graniumhub.data.domain.RTable;
import com.graniumhub.data.dto.booking.BookingInput;
import com.graniumhub.data.dto.booking.BookingResponse;
import com.graniumhub.data.dto.table.TableInput;
import com.graniumhub.data.dto.table.TableResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.repository.BookingRepository;
import com.graniumhub.data.repository.TableRepository;
import com.graniumhub.service.TableService;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Sasha on 4/6/17.
 */
@Service
public class TableServiceImpl implements TableService {

    private final TableRepository tableRepository;

    private final BookingRepository bookingRepository;

    private final AbstractDTOWrapper<TableInput, RTable, TableResponse> wrapper;

    private final AbstractDTOWrapper<BookingInput, Booking, BookingResponse> bookWrapper;

    @Autowired
    public TableServiceImpl(TableRepository tableRepository, BookingRepository bookingRepository, AbstractDTOWrapper<TableInput, RTable, TableResponse> wrapper, AbstractDTOWrapper<BookingInput, Booking, BookingResponse> bookWrapper) {
        this.tableRepository = tableRepository;
        this.bookingRepository = bookingRepository;
        this.wrapper = wrapper;
        this.bookWrapper = bookWrapper;
    }


    @Override
    public BookingResponse book(BookingInput input) {
        Booking booking = bookWrapper.toEntity(input);
        RTable table = tableRepository.findOne(input.getTableId()).orElseThrow(NotFound::new);
        boolean intersect = table.getBookings().stream()
                .reduce(false,
                        (cur, obj) -> this.haveCollision(obj,booking),
                        (l, r) -> l || r);
        if(intersect) throw new RuntimeException("Intersection!");
        Booking res = bookingRepository.save(booking);
        return bookWrapper.toResponse(res);
    }

    private boolean haveCollision(Booking a, Booking b){
        LocalDateTime starta = a.getStart();
        LocalDateTime startb = b.getStart();
        LocalDateTime enda = a.getEnd();
        LocalDateTime endb = b.getEnd();

        boolean isAfter = starta.isAfter(endb) && enda.isAfter(endb);
        boolean isBefore = starta.isBefore(startb) && enda.isBefore(startb);

        return !(isAfter || isBefore);
    }


    @Override
    public List<BookingResponse> loadBookings(int id) {
        RTable table = tableRepository.findOne(id).orElseThrow(NotFound::new);
        List<Booking> books = table.getBookings();
        return books.stream()
                .map(bookWrapper::toResponse)
                .collect(Collectors.toList());
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
