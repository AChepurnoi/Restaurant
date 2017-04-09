package com.graniumhub.data.dto.booking;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by Sasha on 4/8/17.
 */
@Data
@AllArgsConstructor
public class BookingResponse {
    private long start;
    private long end;
}
