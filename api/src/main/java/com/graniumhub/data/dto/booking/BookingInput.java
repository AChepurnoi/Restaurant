package com.graniumhub.data.dto.booking;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * Created by Sasha on 4/8/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingInput {

    private int tableId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime start;
    private int duration;
    private String booker;
    private String phone;



}
