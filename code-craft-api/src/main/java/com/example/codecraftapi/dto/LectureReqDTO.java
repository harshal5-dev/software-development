package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureReqDTO {
  private String lectureNumber;
  private String name;
  private String description;
  private String moduleId;
  private String notes;
  private String contentType;
  private String size;
  private String fileName;
  private String fileOriginalName;
  private String url;
}
