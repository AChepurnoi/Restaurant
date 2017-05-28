package com.graniumhub.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

/**
 * Created by Sasha on 3/29/17.
 */
public interface AmazonS3Service {
    String saveImage(String filename, InputStream stream);
    String saveImage(MultipartFile image);

    void deleteImage(String url);
}
