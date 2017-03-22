package com.graniumhub;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Sasha.Chepurnoi on 25.11.16.
 */


@RestController
public class Controller {

    @RequestMapping("/test")
    public String test(){
        return "Hello authorized user!";
    }


}
