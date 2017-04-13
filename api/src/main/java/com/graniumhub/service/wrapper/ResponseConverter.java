package com.graniumhub.service.wrapper;

/**
 * Created by Sasha on 4/13/17.
 */
public interface ResponseConverter<E, R> {

    R convert(E input);
}
