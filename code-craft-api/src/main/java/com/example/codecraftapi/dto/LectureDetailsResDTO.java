package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LectureDetailsResDTO {
  private int id;
  private String name;
  private String lectureNumber;
  private String description;
  private String notes;
  private String moduleNumber;
  private String moduleName;
  private String pdfUrl;
  private String fileName;
  private String moduleShortDescription;
  private List<ProblemResDTO> lectureProblems;
  private List<ProblemResDTO> assignmentProblems;
  private List<ProblemResDTO> additionalProblems;
}
