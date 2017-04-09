package com.graniumhub.service;

import com.graniumhub.data.dto.booking.BookingInput;
import com.graniumhub.data.dto.booking.BookingResponse;
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

    BookingResponse book(BookingInput input);


    List<BookingResponse> loadBookings(int id);
}
