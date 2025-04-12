package com.example.codecraftapi.repositories;


import com.example.codecraftapi.model.Lecture;
import com.example.codecraftapi.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {
  List<Lecture> findByModuleId(Integer moduleId);

  @Query("SELECT p FROM Problem p WHERE p.lecture.id = :lectureId AND p.problemType.code = '01' ORDER BY p.problemNumber ASC")
  List<Problem> findAssignmentProblemsByLectureId(Integer lectureId);

  @Query("SELECT p FROM Problem p WHERE p.lecture.id = :lectureId AND p.problemType.code = '02' ORDER BY p.problemNumber ASC")
  List<Problem> findAdditionalProblemsByLectureId(Integer lectureId);

  @Query("SELECT p FROM Problem p WHERE p.lecture.id = :lectureId AND p.problemType.code = '03' ORDER BY p.problemNumber ASC")
  List<Problem> findLectureProblemsByLectureId(Integer lectureId);
}
