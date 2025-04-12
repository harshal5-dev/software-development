package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.FileResDTO;
import com.example.codecraftapi.services.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("file")
public class FileController {

  private final S3Service s3Service;

  public FileController(S3Service s3Service) {
    this.s3Service = s3Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<FileResDTO> uploadFile(@RequestParam("file") MultipartFile file) {
    FileResDTO fileResDTO = s3Service.uploadFile(file);
    return ResponseEntity.ok(fileResDTO);
  }

}
