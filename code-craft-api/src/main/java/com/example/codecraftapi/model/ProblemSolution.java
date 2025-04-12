package com.example.codecraftapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Setter
@Getter
@Table(name = "problem_solution")
public class ProblemSolution {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 45)
  @Column(name = "problem_solution_number", length = 45)
  private String problemSolutionNumber;

  @Size(max = 500)
  @Column(name = "name", length = 500)
  private String name;

  @Size(max = 500)
  @Column(name = "description", length = 500)
  private String description;

  @Size(max = 77)
  @Column(name = "time_complexity", length = 77)
  private String timeComplexity;

  @Size(max = 77)
  @Column(name = "space_complexity", length = 77)
  private String spaceComplexity;

  @Column(name = "created_at")
  private Instant createdAt;

  @Column(name = "updated_at")
  private Instant updatedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "problem_id")
  private Problem problem;

  @OneToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "problem_solution_file_storage_id")
  private ProblemSolutionFileStorage problemSolutionFileStorage;
}
