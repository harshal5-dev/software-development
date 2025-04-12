package com.example.codecraftapi.services;


import com.example.codecraftapi.dto.FileResDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class S3Service {
  @Value("${aws.s3.bucket-name}")
  private String bucketName;

  @Value("${aws.s3.region}")
  private String region;

  private final S3Client s3Client;
  private final CommonService commonService;

  public S3Service(S3Client s3Client, CommonService commonService) {
    this.s3Client = s3Client;
    this.commonService = commonService;
  }

  private FileResDTO convertToDTO(MultipartFile file, String fileName, String url) {
    FileResDTO fileResDTO = new FileResDTO();

    fileResDTO.setOriginalName(file.getOriginalFilename());
    fileResDTO.setName(fileName);
    fileResDTO.setContentType(file.getContentType());
    fileResDTO.setSize(commonService.getFileSizeInMB(file.getSize()));
    fileResDTO.setUrl(url);
    return fileResDTO;
  }

  private String getFileUrl(String fileName) {
    return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, fileName);
  }

  public FileResDTO uploadFile(MultipartFile file) {
    try {
      String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
      InputStream inputStream = file.getInputStream();

      PutObjectRequest putObjectRequest = PutObjectRequest.builder()
              .bucket(bucketName)
              .key(fileName)
              .contentType(file.getContentType())
              .build();

      PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));

      String fileUrl = getFileUrl(fileName);

      return convertToDTO(file, fileName, fileUrl);
    } catch (IOException e){
      return null;
    }
  }
}
