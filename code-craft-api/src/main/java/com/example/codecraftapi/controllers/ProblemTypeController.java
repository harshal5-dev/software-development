package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.ProblemTypeReqDTO;
import com.example.codecraftapi.dto.ProblemTypeResDTO;
import com.example.codecraftapi.services.ProblemTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("problem-type")
public class ProblemTypeController {
  private final ProblemTypeService problemTypeService;

  public ProblemTypeController(ProblemTypeService problemTypeService) {
    this.problemTypeService = problemTypeService;
  }

  @GetMapping
  private ResponseEntity<List<ProblemTypeResDTO>> getAllProblemTypes() {
    return ResponseEntity.ok(problemTypeService.getAllProblemTypes());
  }

  @PostMapping
  private ResponseEntity<ProblemTypeResDTO> createProblemType(@RequestBody ProblemTypeReqDTO problemTypeReqDTO) {
    return ResponseEntity.ok(problemTypeService.createProblemType(problemTypeReqDTO));
  }

  @PutMapping("/{id}")
  private ResponseEntity<ProblemTypeResDTO> updateProblemType(@PathVariable int id, @RequestBody ProblemTypeReqDTO problemTypeReqDTO) {
    return ResponseEntity.ok(problemTypeService.updateProblemType(id, problemTypeReqDTO));
  }

  @DeleteMapping("/{id}")
  private ResponseEntity<ProblemTypeResDTO> deleteProblemType(@PathVariable int id) {
    return ResponseEntity.ok(problemTypeService.deleteProblemType(id));
  }
}
