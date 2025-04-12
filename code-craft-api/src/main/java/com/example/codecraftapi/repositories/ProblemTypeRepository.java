package com.example.codecraftapi.repositories;

import com.example.codecraftapi.model.ProblemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemTypeRepository extends JpaRepository<ProblemType, Integer> {
}
