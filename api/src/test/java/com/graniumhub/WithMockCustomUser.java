package com.graniumhub;

import org.springframework.security.test.context.support.WithSecurityContext;

/**
 * Created by Sasha on 4/14/17.
 */
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomUser {

    int id() default 5;


    String login() default "user";

    String password() default "password";
    String email() default "email";

    boolean admin() default false;

}