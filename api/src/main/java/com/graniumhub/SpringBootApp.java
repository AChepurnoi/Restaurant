package com.graniumhub;

import com.graniumhub.data.repository.DishRepository;
import com.graniumhub.data.repository.UserRepository;
import com.graniumhub.service.UserService;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import javax.swing.*;
import java.util.Optional;

/**
 * Created by Sasha.Chepurnoi on 25.11.16.
 */

@SpringBootApplication
public class SpringBootApp {

    public static void main(String[] args) {
        new SpringApplicationBuilder(SpringBootApp.class)
                .run(args);
    }



}
