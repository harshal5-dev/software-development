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

@Getter
@Setter
@Entity
@Table(name = "lecture")
public class Lecture {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 300)
  @Column(name = "name", length = 300)
  private String name;

  @Size(max = 45)
  @Column(name = "lecture_number", length = 45)
  private String lectureNumber;

  @Size(max = 500)
  @Column(name = "description", length = 500)
  private String description;

  @Column(name = "notes", columnDefinition = "TEXT")
  private String notes;


  @Column(name = "created_at")
  private Instant createdAt;

  @Column(name = "updated_at")
  private Instant updatedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "module_id")
  private Module module;

  @OneToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "lecture_note_file_storage_id")
  private LectureNoteFileStorage lectureNoteFileStorage;

  @OneToMany(mappedBy = "lecture")
  private Set<Problem> problems = new LinkedHashSet<>();
}