package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.ProblemIdDTO;
import com.example.codecraftapi.dto.ProblemSolutionReqDTO;
import com.example.codecraftapi.dto.ProblemSolutionResDTO;
import com.example.codecraftapi.services.ProblemSolutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("problem-solution")
public class ProblemSolutionController {
  private final ProblemSolutionService problemSolutionService;

  public ProblemSolutionController(ProblemSolutionService problemSolutionService) {
    this.problemSolutionService = problemSolutionService;
  }

  @GetMapping
  private ResponseEntity<List<ProblemSolutionResDTO>> getProblemSolutions() {
    return ResponseEntity.ok(problemSolutionService.getProblemSolutions());
  }

  @PostMapping("/by-problem-id")
  private ResponseEntity<List<ProblemSolutionResDTO>> getProblemSolutionsByProblemId(@RequestBody ProblemIdDTO problemIdDTO) {
    return ResponseEntity.ok(problemSolutionService.getProblemSolutionsByProblemId(problemIdDTO.getProblemId()));
  }

  @PostMapping
  private ResponseEntity<ProblemSolutionResDTO> createProblemSolution(@RequestBody ProblemSolutionReqDTO problemSolutionReqDTO) {
    return ResponseEntity.ok(problemSolutionService.createProblemSolution(problemSolutionReqDTO));
  }

  @PutMapping("/{id}")
  private ResponseEntity<ProblemSolutionResDTO> updateProblemSolution(@PathVariable Integer id, @RequestBody ProblemSolutionReqDTO problemSolutionReqDTO) {
    return ResponseEntity.ok(problemSolutionService.updateProblemSolution(id, problemSolutionReqDTO));
  }

  @DeleteMapping("/{id}")
  private ResponseEntity<ProblemSolutionResDTO> deleteProblemSolution(@PathVariable Integer id) {
    return ResponseEntity.ok(problemSolutionService.deleteProblemSolution(id));
  }
}
