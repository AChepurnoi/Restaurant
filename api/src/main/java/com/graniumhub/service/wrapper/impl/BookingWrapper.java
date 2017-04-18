package com.graniumhub.service.wrapper.impl;

import com.graniumhub.data.domain.Booking;
import com.graniumhub.data.domain.RTable;
import com.graniumhub.data.dto.booking.BookingInput;
import com.graniumhub.data.dto.booking.BookingResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.data.repository.TableRepository;
import com.graniumhub.service.wrapper.AbstractDTOWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

/**
 * Created by Sasha on 4/8/17.
 */
@Component
public class BookingWrapper implements AbstractDTOWrapper<BookingInput, Booking, BookingResponse> {

    private final TableRepository repository;
    private final int HOURS = 60 * 60 * 1000;
    @Autowired
    public BookingWrapper(TableRepository repository) {
        this.repository = repository;
    }

    @Override
    public Booking toEntity(BookingInput input) {
        RTable table = repository.findOne(input.getTableId()).orElseThrow(NotFound::new);
        LocalDateTime end = input.getStart().plusHours(input.getDuration());

        return Booking.builder()
                .table(table)
                .booker(input.getBooker())
                .start(input.getStart())
                .endTime(end)
                .phone(input.getPhone())
                .build();

    }

    @Override
    public BookingResponse toResponse(Booking entity) {

        return new BookingResponse(
                entity.getStart().toInstant(ZoneOffset.UTC).toEpochMilli(),
                entity.getEndTime().toInstant(ZoneOffset.UTC).toEpochMilli());

    }

    @Override
    public Class<Booking> entityClass() {
        return Booking.class;
    }

    @Override
    public Class<BookingInput> inputClass() {
        return BookingInput.class;
    }

    @Override
    public Class<BookingResponse> responseClass() {
        return BookingResponse.class;
    }
}
