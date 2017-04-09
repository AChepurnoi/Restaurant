package com.graniumhub.web;

import com.graniumhub.data.dto.booking.BookingInput;
import com.graniumhub.data.dto.booking.BookingResponse;
import com.graniumhub.data.dto.table.TableInput;
import com.graniumhub.data.dto.table.TableResponse;
import com.graniumhub.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Sasha on 4/6/17.
 */

@RestController
@CrossOrigin
public class TableController {


    private final TableService tableService;

    @Autowired
    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping(value = "/tables")
    public ResponseEntity<List<TableResponse>> get(){
        List<TableResponse> result = tableService.findAll();
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/tables")
    public ResponseEntity<TableResponse> place(@RequestBody TableInput table){
        TableResponse response = tableService.place(table);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/tables/{tableId}/booking")
    public ResponseEntity<BookingResponse> book(
            @PathVariable int tableId,
            @RequestBody BookingInput input){
        input.setTableId(tableId);
        BookingResponse response = tableService.book(input);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/tables/{id}/booking")
    public ResponseEntity<List<BookingResponse>> getBookings(@PathVariable int id){
        List<BookingResponse> response = tableService.loadBookings(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/tables/{id}")
    public ResponseEntity delete(@PathVariable int id){
        boolean res = tableService.remove(id);
        return ResponseEntity.ok().build();
    }



}
