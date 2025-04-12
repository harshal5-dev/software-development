package com.example.codecraftapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "problem")
public class Problem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id" , nullable = false)
  private Integer id;

  @Size(max = 45)
  @Column(name = "problem_number", length = 45)
  private String problemNumber;

  @Size(max = 500)
  @Column(name = "name", length = 500)
  private String name;

  @Size(max = 500)
  @Column(name = "description", length = 5000)
  private String description;

  @Size(max = 300)
  @Column(name = "constraints", length = 300)
  private String constraints;

  @Column(name = "created_at")
  private Instant createdAt;

  @Column(name = "updated_at")
  private Instant updatedAt;

  @ManyToOne
  @JoinColumn(name = "problem_mode_id", referencedColumnName = "id")
  private ProblemMode problemMode;

  @ManyToOne
  @JoinColumn(name = "problem_type_id", referencedColumnName = "id")
  private ProblemType problemType;

  @OneToMany(mappedBy = "problem")
  private Set<ProblemSolution> problemSolutions = new LinkedHashSet<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "lecture_id")
  private Lecture lecture;
}
