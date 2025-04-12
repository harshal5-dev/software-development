package com.example.codecraftapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "module")
public class Module {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 45)
  @Column(name = "module_number", length = 45)
  private String moduleNumber;

  @Size(max = 300)
  @Column(name = "name", length = 300)
  private String name;

  @Size(max = 500)
  @Column(name = "description", length = 500)
  private String description;

  @Size(max = 100)
  @Column(name = "short_description", length = 100)
  private String shortDescription;

  @Column(name = "created_at")
  private Instant createdAt;

  @Column(name = "updated_at")
  private Instant updatedAt;

  @OneToMany(mappedBy = "module")
  private Set<Lecture> lectures = new LinkedHashSet<>();

}