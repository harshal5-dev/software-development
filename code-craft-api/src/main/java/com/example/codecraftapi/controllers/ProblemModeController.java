package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.ProblemModeReqDTO;
import com.example.codecraftapi.dto.ProblemModeResDTO;
import com.example.codecraftapi.services.ProblemModeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("problem-mode")
public class ProblemModeController {
  private final ProblemModeService problemModeService;

  public ProblemModeController(ProblemModeService problemModeService) {
    this.problemModeService = problemModeService;
  }

  @GetMapping
  private ResponseEntity<List<ProblemModeResDTO>> getProblemMode() {
    return ResponseEntity.ok(problemModeService.getAllProblemMode());
  }

  @PostMapping
  private ResponseEntity<ProblemModeResDTO> createProblemMode(@RequestBody ProblemModeReqDTO problemModeReqDTO) {
    return ResponseEntity.ok(problemModeService.createProblemMode(problemModeReqDTO));
  }

  @PutMapping("/{id}")
  private ResponseEntity<ProblemModeResDTO> updateProblemMode(@PathVariable int id, @RequestBody ProblemModeReqDTO problemModeReqDTO) {
    return ResponseEntity.ok(problemModeService.updateProblemMode(id, problemModeReqDTO));
  }

  @DeleteMapping("/{id}")
  private ResponseEntity<ProblemModeResDTO> deleteProblemMode(@PathVariable int id) {
    return ResponseEntity.ok(problemModeService.deleteProblemMode(id));
  }
}
