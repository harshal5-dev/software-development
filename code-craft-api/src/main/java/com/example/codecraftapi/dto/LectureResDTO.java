package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureResDTO {

  private Integer id;
  private String name;
  private String lectureNumber;
  private String description;
  private String updatedAt;
  private String moduleNumber;
  private Integer moduleId;
  private String notes;
  private FileResDTO fileInfo;
}
