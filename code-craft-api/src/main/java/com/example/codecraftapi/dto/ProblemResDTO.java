package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProblemResDTO {
  private Integer id;
  private String problemNumber;
  private String name;
  private String description;
  private String constraints;
  private Integer problemModeId;
  private Integer problemTypeId;
  private Integer lectureId;
  private String lectureNumber;
  private String updatedAt;
  private Integer moduleId;
  private String problemType;
  private String problemMode;
}
