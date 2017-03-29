package com.graniumhub.service.impl;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.util.IOUtils;
import com.graniumhub.service.AmazonS3Service;
import lombok.SneakyThrows;
import lombok.experimental.var;
import lombok.val;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.UUID;

/**
 * Created by Sasha on 3/29/17.
 */
@Service
public class AmazonS3ServiceImpl implements AmazonS3Service{

    private String PHOTO_FOLDER = "images";
    private String AMAZON_S3_URL = "https://s3.eu-central-1.amazonaws.com/";

    @Value("${amazon.s3.bucket-name}")
    private String BUCKET_NAME;

    @Value("${amazon.s3.accessKey}")
    private String ACCESS_KEY;

    @Value("${amazon.s3.secretKey}")
    private String SECRET_KEY;

    private AmazonS3 amazonClient;

    @PostConstruct
    public void initializer() {
        amazonClient = new AmazonS3Client(new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY));
        amazonClient.setRegion(Region.getRegion(Regions.EU_CENTRAL_1));
    }

    @Override
    @SneakyThrows
    public String saveImage(String filename, InputStream stream) {
        InputStream image = resize(stream);
        String format = getFormat(filename);
        String objectName = String.format("%s/%s.%s", PHOTO_FOLDER, UUID.randomUUID(), format);
        amazonClient.putObject(BUCKET_NAME, objectName, image, new ObjectMetadata());
        return objectName;
    }

    @Override
    public void deleteImage(String url) {
        amazonClient.deleteObject(BUCKET_NAME, url);
    }


    private InputStream resize(InputStream stream) throws IOException {
        BufferedImage srcImage = ImageIO.read(stream);
        BufferedImage scaledImage = Scalr.resize(srcImage, 320 * 4, 240 * 4);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(scaledImage, "png", baos);
        baos.flush();
        InputStream fis = new ByteArrayInputStream(baos.toByteArray());
        return fis;
    }

    private String getFormat(String filename) {
        String[] tokens = filename.split("\\.");
        if(tokens.length == 0) return "png";
        String format = tokens[tokens.length - 1];
        if (format.equals(filename) || format.isEmpty()) format = "png";
        return format;
    }

    private Pair<InputStream, InputStream> duplicateStream(InputStream stream) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        IOUtils.copy(stream, baos);
        InputStream is1 = new ByteArrayInputStream(baos.toByteArray());
        InputStream is2 = new ByteArrayInputStream(baos.toByteArray());
        return Pair.of(is1,is2);

    }
}