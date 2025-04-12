package com.example.codecraftapi.repositories;

import com.example.codecraftapi.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Integer> {
  List<Problem> findByLectureId(int lecturerId);
}
