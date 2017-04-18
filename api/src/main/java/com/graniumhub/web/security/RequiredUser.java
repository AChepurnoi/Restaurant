package com.graniumhub.web.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Created by Sasha on 4/18/17.
 */
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAuthority('user') or hasAuthority('admin')")
public @interface RequiredUser {
}
