package com.example.codecraftapi.services;

import com.example.codecraftapi.dto.FileResDTO;
import com.example.codecraftapi.dto.ProblemSolutionReqDTO;
import com.example.codecraftapi.dto.ProblemSolutionResDTO;
import com.example.codecraftapi.model.Problem;
import com.example.codecraftapi.model.ProblemSolution;
import com.example.codecraftapi.model.ProblemSolutionFileStorage;
import com.example.codecraftapi.repositories.ProblemSolutionFileStorageRepository;
import com.example.codecraftapi.repositories.ProblemSolutionRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ProblemSolutionService {
  private final ProblemSolutionRepository problemSolutionRepository;
  private final CommonService commonService;
  private final ProblemService problemService;
  private final ProblemSolutionFileStorageRepository problemSolutionFileStorageRepository;

  public ProblemSolutionService(ProblemSolutionRepository problemSolutionRepository, CommonService commonService, ProblemService problemService,
                                ProblemSolutionFileStorageRepository problemSolutionFileStorageRepository) {
    this.problemSolutionRepository = problemSolutionRepository;
    this.commonService = commonService;
    this.problemService = problemService;
    this.problemSolutionFileStorageRepository = problemSolutionFileStorageRepository;
  }

  private ProblemSolutionResDTO convertToDTO(ProblemSolution problemSolution) {
    ProblemSolutionResDTO problemSolutionResDTO = new ProblemSolutionResDTO();
    FileResDTO fileResDTO = getFileResDTO(problemSolution);

    problemSolutionResDTO.setId(problemSolution.getId());
    problemSolutionResDTO.setProblemSolutionNumber(problemSolution.getProblemSolutionNumber());
    problemSolutionResDTO.setName(problemSolution.getName());
    problemSolutionResDTO.setDescription(problemSolution.getDescription());
    problemSolutionResDTO.setTimeComplexity(problemSolution.getTimeComplexity());
    problemSolutionResDTO.setSpaceComplexity(problemSolution.getSpaceComplexity());
    problemSolutionResDTO.setProblemNumber(problemSolution.getProblem().getProblemNumber());
    problemSolutionResDTO.setUpdatedAt(commonService.getFormattedDate(problemSolution.getUpdatedAt()));
    problemSolutionResDTO.setProblemId(problemSolution.getProblem().getId());
    problemSolutionResDTO.setLectureId(problemSolution.getProblem().getLecture().getId());
    problemSolutionResDTO.setModuleId(problemSolution.getProblem().getLecture().getModule().getId());
    problemSolutionResDTO.setFileInfo(fileResDTO);

    return problemSolutionResDTO;
  }

  private static FileResDTO getFileResDTO(ProblemSolution problemSolution) {
    FileResDTO fileResDTO = new FileResDTO();
    ProblemSolutionFileStorage problemSolutionFileStorage = problemSolution.getProblemSolutionFileStorage();

    fileResDTO.setId(problemSolutionFileStorage.getId());
    fileResDTO.setName(problemSolutionFileStorage.getFileName());
    fileResDTO.setOriginalName(problemSolutionFileStorage.getFileOriginalName());
    fileResDTO.setUrl(problemSolutionFileStorage.getUrl());
    fileResDTO.setContentType(problemSolutionFileStorage.getContentType());
    fileResDTO.setSize(problemSolutionFileStorage.getSize());
    return fileResDTO;
  }

  public List<ProblemSolutionResDTO> getProblemSolutions() {
    List<ProblemSolution> problemSolutions = problemSolutionRepository.findAll();
    return problemSolutions.stream().map(this::convertToDTO).toList();
  }

  public List<ProblemSolutionResDTO> getProblemSolutionsByProblemId(Integer problemId) {
    List<ProblemSolution> problemSolutionsOptional = problemSolutionRepository.findByProblemId(problemId);
    return problemSolutionsOptional.stream().map(this::convertToDTO).toList();
  }

  public ProblemSolutionResDTO createProblemSolution(ProblemSolutionReqDTO problemSolutionReqDTO) {
    ProblemSolution problemSolution = new ProblemSolution();
    Problem problem = problemService.getProblemById(Integer.parseInt(problemSolutionReqDTO.getProblemId()));
    ProblemSolutionFileStorage problemSolutionFileStorage = new ProblemSolutionFileStorage();

    problemSolutionFileStorage.setFileName(problemSolutionReqDTO.getFileName());
    problemSolutionFileStorage.setFileOriginalName(problemSolutionReqDTO.getFileOriginalName());
    problemSolutionFileStorage.setUrl(problemSolutionReqDTO.getUrl());
    problemSolutionFileStorage.setContentType(problemSolutionReqDTO.getContentType());
    problemSolutionFileStorage.setSize(problemSolutionReqDTO.getSize());
    problemSolutionFileStorage.setUpdatedAt(Instant.now());
    problemSolutionFileStorage.setCreatedAt(Instant.now());

    ProblemSolutionFileStorage createdProblemSolutionFileStorage = problemSolutionFileStorageRepository.save(problemSolutionFileStorage);

    problemSolution.setName(problemSolutionReqDTO.getName());
    problemSolution.setProblemSolutionNumber(problemSolutionReqDTO.getProblemSolutionNumber());
    problemSolution.setDescription(problemSolutionReqDTO.getDescription());
    problemSolution.setTimeComplexity(problemSolutionReqDTO.getTimeComplexity());
    problemSolution.setSpaceComplexity(problemSolutionReqDTO.getSpaceComplexity());
    if (problem != null) {
      problemSolution.setProblem(problem);
    }
    problemSolution.setCreatedAt(Instant.now());
    problemSolution.setUpdatedAt(Instant.now());
    problemSolution.setProblemSolutionFileStorage(createdProblemSolutionFileStorage);

    ProblemSolution savedProblemSolution = problemSolutionRepository.save(problemSolution);
    return convertToDTO(savedProblemSolution);
  }

  public ProblemSolutionResDTO updateProblemSolution(Integer id,ProblemSolutionReqDTO problemSolutionReqDTO) {
    ProblemSolution problemSolution = problemSolutionRepository.findById(id).orElse(null);
    Problem problem = problemService.getProblemById(Integer.parseInt(problemSolutionReqDTO.getProblemId()));

    if (problemSolution != null) {
      ProblemSolutionFileStorage problemSolutionFileStorage = problemSolution.getProblemSolutionFileStorage();

      problemSolution.setProblemSolutionNumber(problemSolutionReqDTO.getProblemSolutionNumber());
      problemSolution.setName(problemSolutionReqDTO.getName());
      problemSolution.setDescription(problemSolutionReqDTO.getDescription());
      problemSolution.setTimeComplexity(problemSolutionReqDTO.getTimeComplexity());
      problemSolution.setSpaceComplexity(problemSolutionReqDTO.getSpaceComplexity());
      if (problem != null) {
        problemSolution.setProblem(problem);
      }
      problemSolution.setUpdatedAt(Instant.now());

      assert problemSolutionFileStorage != null;
      problemSolutionFileStorage.setFileName(problemSolutionReqDTO.getFileName());
      problemSolutionFileStorage.setFileOriginalName(problemSolutionReqDTO.getFileOriginalName());
      problemSolutionFileStorage.setUrl(problemSolutionReqDTO.getUrl());
      problemSolutionFileStorage.setContentType(problemSolutionReqDTO.getContentType());
      problemSolutionFileStorage.setSize(problemSolutionReqDTO.getSize());
      problemSolutionFileStorage.setUpdatedAt(Instant.now());

      return convertToDTO(problemSolutionRepository.save(problemSolution));
    }

    return null;
  }

  public ProblemSolutionResDTO deleteProblemSolution(Integer id) {
    ProblemSolution problemSolution = problemSolutionRepository.findById(id).orElse(null);
    assert problemSolution != null;
    problemSolutionRepository.delete(problemSolution);
    return convertToDTO(problemSolution);
  }
}
