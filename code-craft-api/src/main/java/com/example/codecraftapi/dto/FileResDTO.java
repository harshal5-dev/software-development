package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileResDTO {
    private Integer id;
    private String name;
    private String originalName;
    private String url;
    private String contentType;
    private String size;
}
