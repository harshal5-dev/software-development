package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProblemReqDTO {
  private String problemNumber;
  private String name;
  private String description;
  private String constraints;
  private String problemModeId;
  private String problemTypeId;
  private String lectureId;
}
