package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProblemSolutionResDTO {
  private Integer id;
  private String problemSolutionNumber;
  private String name;
  private String description;
  private String timeComplexity;
  private String spaceComplexity;
  private String updatedAt;
  private String problemNumber;
  private Integer lectureId;
  private Integer moduleId;
  private Integer problemId;
  private FileResDTO fileInfo;
}
