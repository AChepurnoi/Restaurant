package com.graniumhub.service;

import java.io.InputStream;

/**
 * Created by Sasha on 3/29/17.
 */
public interface AmazonS3Service {
    String saveImage(String filename, InputStream stream);
    void deleteImage(String url);
}
