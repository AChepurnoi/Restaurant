package com.graniumhub.web;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.category.CategoryResponse;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.data.exception.InvalidInputException;
import com.graniumhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static org.springframework.security.config.Elements.CORS;

/**
 * Created by Sasha on 3/28/17.
 */
@RestController
@CrossOrigin
public class UserController{

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/echo")
    public ResponseEntity<CategoryResponse> echoTest(){
        return ResponseEntity.ok(new CategoryResponse(1,"Test","url"));
    }

    @PostMapping(value = "/users")
    public ResponseEntity<UserResponse> register(@RequestBody @Valid UserInput input,
                                                 BindingResult params){
        if(params.hasErrors())throw new InvalidInputException(params.getFieldErrors());
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
