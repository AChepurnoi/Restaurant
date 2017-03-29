package com.graniumhub.service.wrapper;

/**
 * Created by Sasha on 3/28/17.
 */
public interface AbstractDTOWrapper<I,E,R> {
    E toEntity(I input);
    R toResponse(E entity);

    Class<E> entityClass();
    Class<I> inputClass();
    Class<R> responseClass();
}
