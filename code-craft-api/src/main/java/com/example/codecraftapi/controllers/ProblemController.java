package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.LectureIdDTO;
import com.example.codecraftapi.dto.ProblemReqDTO;
import com.example.codecraftapi.dto.ProblemResDTO;
import com.example.codecraftapi.services.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("problem")
public class ProblemController {
  private final ProblemService problemService;

  public ProblemController(ProblemService problemService) {
    this.problemService = problemService;
  }

  @GetMapping
  private ResponseEntity<List<ProblemResDTO>> getAllProblem() {
    return ResponseEntity.ok(problemService.getAllProblems());
  }

  @PostMapping("by-lecture-id")
  private ResponseEntity<List<ProblemResDTO>> getAllProblemByLectureId(@RequestBody LectureIdDTO lectureIdDTO) {
    return ResponseEntity.ok(problemService.getProblemsByLectureId(lectureIdDTO.getLectureId()));
  }

  @PostMapping
  private ResponseEntity<ProblemResDTO> createProblem(@RequestBody ProblemReqDTO problemReqDTO) {
    return ResponseEntity.ok(problemService.createProblem(problemReqDTO));
  }

  @PutMapping("/{id}")
  private ResponseEntity<ProblemResDTO> updateProblem(@PathVariable Integer id, @RequestBody ProblemReqDTO problemReqDTO) {
    return ResponseEntity.ok(problemService.updateProblem(id, problemReqDTO));
  }

  @DeleteMapping("/{id}")
  private ResponseEntity<ProblemResDTO> deleteProblem(@PathVariable Integer id) {
    return ResponseEntity.ok(problemService.deleteProblem(id));
  }
}
