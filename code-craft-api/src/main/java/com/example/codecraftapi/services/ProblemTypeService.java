package com.example.codecraftapi.services;

import com.example.codecraftapi.dto.ProblemTypeReqDTO;
import com.example.codecraftapi.dto.ProblemTypeResDTO;
import com.example.codecraftapi.model.ProblemType;
import com.example.codecraftapi.repositories.ProblemTypeRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemTypeService {
  private final ProblemTypeRepository problemTypeRepository;
  private final CommonService commonService;

  public ProblemTypeService(ProblemTypeRepository problemTypeRepository, CommonService commonService) {
    this.problemTypeRepository = problemTypeRepository;
    this.commonService = commonService;
  }

  private ProblemTypeResDTO convertToDTO(ProblemType problemTypes) {
    ProblemTypeResDTO problemTypeDTO = new ProblemTypeResDTO();

    problemTypeDTO.setId(problemTypes.getId());
    problemTypeDTO.setName(problemTypes.getName());
    problemTypeDTO.setCode(problemTypes.getCode());
    problemTypeDTO.setUpdatedAt(commonService.getFormattedDate(problemTypes.getUpdatedAt()));

    return problemTypeDTO;
  }

  public List<ProblemTypeResDTO> getAllProblemTypes() {
    List<ProblemType> problemTypes = problemTypeRepository.findAll();
    return problemTypes.stream().map(this::convertToDTO).toList();
  }

  public ProblemType getProblemTypeById(int id) {
    Optional<ProblemType> problemType = problemTypeRepository.findById(id);
    return problemType.orElse(null);
  }

  public ProblemTypeResDTO createProblemType(ProblemTypeReqDTO problemTypeReqDTO) {
    ProblemType problemType = new ProblemType();

    problemType.setName(problemTypeReqDTO.getName());
    problemType.setCode(problemTypeReqDTO.getCode());
    problemType.setCreatedAt(Instant.now());
    problemType.setUpdatedAt(Instant.now());
    ProblemType createdProblemType = problemTypeRepository.save(problemType);

    return convertToDTO(createdProblemType);
  }

  public ProblemTypeResDTO updateProblemType(Integer id,ProblemTypeReqDTO problemTypeReqDTO) {
    Optional<ProblemType> problemTypeOptional = problemTypeRepository.findById(id);

    if (problemTypeOptional.isPresent()) {
      ProblemType problemType = problemTypeOptional.get();

      problemType.setName(problemTypeReqDTO.getName());
      problemType.setCode(problemTypeReqDTO.getCode());
      problemType.setUpdatedAt(Instant.now());

      ProblemType updatedProblemType = problemTypeRepository.save(problemType);
      return convertToDTO(updatedProblemType);
    }

    return null;
  }

  public ProblemTypeResDTO deleteProblemType(Integer id) {
    Optional<ProblemType> problemTypeOptional = problemTypeRepository.findById(id);
    if (problemTypeOptional.isPresent()) {
      ProblemType problemType = problemTypeOptional.get();
      problemTypeRepository.delete(problemType);
      return convertToDTO(problemType);
    }

    return null;
  }
}
