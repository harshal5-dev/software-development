package com.example.codecraftapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleResDTO {
  private Integer id;
  private String moduleNumber;
  private String name;
  private String description;
  private String shortDescription;
  private String updatedAt;
}
