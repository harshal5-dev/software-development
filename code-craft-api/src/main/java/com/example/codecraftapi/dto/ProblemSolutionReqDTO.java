package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProblemSolutionReqDTO {
  private String problemSolutionNumber;
  private String name;
  private String description;
  private String timeComplexity;
  private String spaceComplexity;
  private String problemId;
  private String problemFileStorageId;
  private String contentType;
  private String size;
  private String fileName;
  private String fileOriginalName;
  private String url;
}
