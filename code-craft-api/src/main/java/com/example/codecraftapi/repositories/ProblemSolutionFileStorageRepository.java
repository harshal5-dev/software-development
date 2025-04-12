package com.example.codecraftapi.repositories;

import com.example.codecraftapi.model.ProblemSolutionFileStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemSolutionFileStorageRepository extends JpaRepository<ProblemSolutionFileStorage, Integer> {
}
