package com.example.codecraftapi.repositories;

import com.example.codecraftapi.model.ProblemMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemModeRepository extends JpaRepository<ProblemMode, Integer> {
}
