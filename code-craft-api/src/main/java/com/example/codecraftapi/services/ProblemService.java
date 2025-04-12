package com.example.codecraftapi.services;

import com.example.codecraftapi.dto.ProblemReqDTO;
import com.example.codecraftapi.dto.ProblemResDTO;
import com.example.codecraftapi.model.Lecture;
import com.example.codecraftapi.model.Problem;
import com.example.codecraftapi.model.ProblemMode;
import com.example.codecraftapi.model.ProblemType;
import com.example.codecraftapi.repositories.ProblemRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {
  private final ProblemRepository problemRepository;
  private final ProblemModeService problemModeService;
  private final ProblemTypeService problemTypeService;
  private final LectureService lectureService;

  public ProblemService(ProblemRepository problemRepository, ProblemModeService problemModeService, ProblemTypeService problemTypeService, LectureService lectureService) {
    this.problemRepository = problemRepository;
    this.problemModeService = problemModeService;
    this.problemTypeService = problemTypeService;
    this.lectureService = lectureService;
  }


  public List<ProblemResDTO> getAllProblems() {
    List<Problem> problems = problemRepository.findAll();
    return problems.stream().map(lectureService::convertToDTO).toList();
  }

  public Problem getProblemById(int id) {
    Optional<Problem> problem = problemRepository.findById(id);
    return problem.orElse(null);
  }

  public List<ProblemResDTO> getProblemsByLectureId(Integer lectureId) {
    List<Problem> problems = problemRepository.findByLectureId(lectureId);
    return problems.stream().map(lectureService::convertToDTO).toList();
  }

  public ProblemResDTO createProblem(ProblemReqDTO problemReqDTO) {
    Problem problem = new Problem();
    ProblemMode problemMode = problemModeService.getProblemModeById(Integer.parseInt(problemReqDTO.getProblemModeId()));
    ProblemType problemType = problemTypeService.getProblemTypeById(Integer.parseInt(problemReqDTO.getProblemTypeId()));
    Lecture lecture = lectureService.getLectureById(Integer.parseInt(problemReqDTO.getLectureId()));

    problem.setProblemNumber(problemReqDTO.getProblemNumber());
    problem.setName(problemReqDTO.getName());
    problem.setDescription(problemReqDTO.getDescription());
    problem.setConstraints(problemReqDTO.getConstraints());
    problem.setCreatedAt(Instant.now());
    problem.setUpdatedAt(Instant.now());
    problem.setProblemMode(problemMode);
    problem.setProblemType(problemType);
    problem.setLecture(lecture);

    return lectureService.convertToDTO(problemRepository.save(problem));
  }

  public ProblemResDTO updateProblem(Integer id,ProblemReqDTO problemReqDTO) {
    Optional<Problem> problemOptional = problemRepository.findById(id);

    if (problemOptional.isPresent()) {
      Problem problem = problemOptional.get();
      ProblemMode problemMode = problemModeService.getProblemModeById(Integer.parseInt(problemReqDTO.getProblemModeId()));
      ProblemType problemType = problemTypeService.getProblemTypeById(Integer.parseInt(problemReqDTO.getProblemTypeId()));
      Lecture lecture = lectureService.getLectureById(Integer.parseInt(problemReqDTO.getLectureId()));

      problem.setProblemNumber(problemReqDTO.getProblemNumber());
      problem.setName(problemReqDTO.getName());
      problem.setDescription(problemReqDTO.getDescription());
      problem.setConstraints(problemReqDTO.getConstraints());
      problem.setUpdatedAt(Instant.now());
      problem.setProblemMode(problemMode);
      problem.setProblemType(problemType);
      problem.setLecture(lecture);

      return lectureService.convertToDTO(problemRepository.save(problem));
    }

    return null;
  }

  public ProblemResDTO deleteProblem(Integer id) {
    Optional<Problem> problemOptional = problemRepository.findById(id);
    if (problemOptional.isPresent()) {
      Problem problem = problemOptional.get();
      problemRepository.delete(problem);
      return lectureService.convertToDTO(problem);
    }
    return null;
  }
}
