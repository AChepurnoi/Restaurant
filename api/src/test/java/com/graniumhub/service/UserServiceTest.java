package com.graniumhub.service;

import com.graniumhub.data.domain.User;
import com.graniumhub.data.dto.user.UserInput;
import com.graniumhub.data.dto.user.UserResponse;
import com.graniumhub.data.exception.NotFound;
import com.graniumhub.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;


    @Test
    public void registerUser() throws Exception {
        UserInput input = new UserInput("Ivan","Password","Email","0000");
        UserResponse response = userService.register(input);
        assert(response != null);
        assert(response.getId() != 0);
    }

    @Test(expected = Exception.class)
    public void registerWrongUser() throws Exception {
        UserInput input = new UserInput();
        UserResponse response = userService.register(input);
    }

    @Test
    public void findUserByUsername() throws Exception {
        registerUser();
        User user = userService.loadUserByUsername("Ivan");
        assert (user != null);
        assert (user.getUsername().equals("Ivan"));

    }

    @Test(expected = UsernameNotFoundException.class)
    public void findUnknownUser() throws Exception {
        User user = userService.loadUserByUsername("Ivan");
    }

    @Test
    public void findUserByName() throws Exception {
        registerUser();
        UserResponse user = userService.loadByUsername("Ivan").orElseThrow(NotFound::new);
        assert (user != null);
        assert (user.getLogin().equals("Ivan"));

    }
}
