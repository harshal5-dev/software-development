package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ModuleInfoDTO {
  private int id;
  private String name;
  private String moduleNumber;
  private List<LectureInfoDTO> lectures;
}
