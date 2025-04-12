package com.example.codecraftapi.repositories;

import com.example.codecraftapi.model.ProblemSolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemSolutionRepository extends JpaRepository<ProblemSolution, Integer> {
  List<ProblemSolution> findByProblemId(Integer problemId);
}
