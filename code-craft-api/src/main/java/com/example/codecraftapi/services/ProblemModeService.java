package com.example.codecraftapi.services;

import com.example.codecraftapi.dto.ProblemModeReqDTO;
import com.example.codecraftapi.dto.ProblemModeResDTO;
import com.example.codecraftapi.model.ProblemMode;
import com.example.codecraftapi.repositories.ProblemModeRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemModeService {
  private final ProblemModeRepository problemModeRepository;
  private final CommonService commonService;

  public ProblemModeService(ProblemModeRepository problemModeRepository, CommonService commonService) {
    this.problemModeRepository = problemModeRepository;
    this.commonService = commonService;
  }

  private ProblemModeResDTO convertToDTO(ProblemMode problemMode) {
    ProblemModeResDTO problemModeResDTO = new ProblemModeResDTO();

    problemModeResDTO.setId(problemMode.getId());
    problemModeResDTO.setName(problemMode.getName());
    problemModeResDTO.setCode(problemMode.getCode());
    problemModeResDTO.setUpdatedAt(commonService.getFormattedDate(problemMode.getUpdatedAt()));

    return problemModeResDTO;
  }

  public List<ProblemModeResDTO> getAllProblemMode() {
    List<ProblemMode> problemModes = problemModeRepository.findAll();
    return problemModes.stream().map(this::convertToDTO).toList();
  }

  public ProblemMode getProblemModeById(int id) {
    Optional<ProblemMode> problemMode = problemModeRepository.findById(id);
    return problemMode.orElse(null);
  }

  public ProblemModeResDTO createProblemMode(ProblemModeReqDTO problemModeReqDTO) {
    ProblemMode problemMode = new ProblemMode();

    problemMode.setName(problemModeReqDTO.getName());
    problemMode.setCode(problemModeReqDTO.getCode());
    problemMode.setCreatedAt(Instant.now());
    problemMode.setUpdatedAt(Instant.now());

    ProblemMode createdProblemMode = problemModeRepository.save(problemMode);

    return convertToDTO(createdProblemMode);
  }

  public ProblemModeResDTO updateProblemMode(Integer id, ProblemModeReqDTO problemModeReqDTO) {
    Optional<ProblemMode> problemModeOptional = problemModeRepository.findById(id);

    if (problemModeOptional.isPresent()) {
      ProblemMode problemMode = problemModeOptional.get();

      problemMode.setName(problemModeReqDTO.getName());
      problemMode.setCode(problemModeReqDTO.getCode());
      problemMode.setUpdatedAt(Instant.now());

      ProblemMode updatedProblemMode = problemModeRepository.save(problemMode);
      return convertToDTO(updatedProblemMode);
    }

    return null;
  }

  public ProblemModeResDTO deleteProblemMode(Integer id) {
    Optional<ProblemMode> problemModeOptional = problemModeRepository.findById(id);
    if (problemModeOptional.isPresent()) {
      ProblemMode problemMode = problemModeOptional.get();
      problemModeRepository.delete(problemMode);
      return convertToDTO(problemMode);
    }

    return null;
  }
}
