package com.graniumhub;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import javax.swing.*;

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
