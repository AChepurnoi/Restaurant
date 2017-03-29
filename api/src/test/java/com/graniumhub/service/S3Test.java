package com.graniumhub.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.ObjectInputStream;

/**
 * Created by Sasha on 3/29/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class S3Test {
    @Autowired
    private AmazonS3Service service;

    @Test
    public void createAndDeleteImage() throws Exception {
        BufferedImage image = new BufferedImage(1600, 1500, BufferedImage.TYPE_BYTE_GRAY);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", os);
        InputStream is = new ByteArrayInputStream(os.toByteArray());

        String url = service.saveImage("testfile.jpg",is);
        String[] tokens = url.split("\\.");
        assert (tokens[tokens.length - 1].equals("jpg"));
        service.deleteImage(url);


    }
}
