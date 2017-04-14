package com.graniumhub;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Created by Sasha on 4/14/17.
 */
@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomUser {

    int id() default 5;


    String login() default "user";

    String password() default "password";
    String email() default "email";

    boolean admin() default false;

}