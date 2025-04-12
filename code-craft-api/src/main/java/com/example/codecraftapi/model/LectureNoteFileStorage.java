package com.example.codecraftapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "lecture_note_file_storage")
public class LectureNoteFileStorage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 1000)
  @Column(name = "file_name", length = 1000)
  private String fileName;

  @Size(max = 1000)
  @Column(name = "file_original_name", length = 1000)
  private String fileOriginalName;

  @Size(max = 20)
  @Column(name = "size", length = 20)
  private String size;

  @Size(max = 100)
  @Column(name = "content_type", length = 20)
  private String contentType;

  @Size(max = 500)
  @Column(name = "url", length = 500)
  private String url;

  @Column(name = "created_at")
  private Instant createdAt;

  @Column(name = "updated_at")
  private Instant updatedAt;

  @OneToOne(mappedBy = "lectureNoteFileStorage")
  private Lecture lecture;

}