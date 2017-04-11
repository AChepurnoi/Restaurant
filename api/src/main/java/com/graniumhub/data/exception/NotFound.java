package com.graniumhub.data.exception;

/**
 * Created by Sasha on 3/30/17.
 */

public class NotFound extends ServerException {
    public NotFound() {
        super("Not found");
    }

    public NotFound(String message) {
        super(message);
    }
}
