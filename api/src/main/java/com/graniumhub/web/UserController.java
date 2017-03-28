package com.graniumhub.web;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @PostMapping(value = "/users")
    public ResponseEntity<UserResponse> register(@RequestBody UserInput input){
        UserResponse response = userService.register(input);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/users/{username}")
    public ResponseEntity<UserResponse> getByUsername(@PathVariable String username){
        Optional<UserResponse> response = userService.loadByUsername(username);
        return response
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    }

}
