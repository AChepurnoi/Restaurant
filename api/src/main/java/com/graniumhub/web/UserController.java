package com.graniumhub.web;

import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Sasha on 3/28/17.
 */
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @PostMapping(value = "/users",consumes = "application/json")
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<UserResponse> register(@RequestBody UserInput input){
        UserResponse response = userService.register(input);
        return ResponseEntity.ok(response);
    }

}
