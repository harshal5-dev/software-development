package com.example.codecraftapi.services;

import com.example.codecraftapi.dto.LectureInfoDTO;
import com.example.codecraftapi.dto.ModuleInfoDTO;
import com.example.codecraftapi.dto.ModuleReqDTO;
import com.example.codecraftapi.dto.ModuleResDTO;
import com.example.codecraftapi.model.Lecture;
import com.example.codecraftapi.repositories.ModuleRepository;
import org.springframework.stereotype.Service;
import com.example.codecraftapi.model.Module;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {
  private final ModuleRepository moduleRepository;
  private final CommonService commonService;


  ModuleService(ModuleRepository moduleRepository, CommonService commonService) {
    this.moduleRepository = moduleRepository;
    this.commonService = commonService;
  }

  private ModuleResDTO convertToDTO(Module module) {
    ModuleResDTO moduleResDTO = new ModuleResDTO();

    moduleResDTO.setId(module.getId());
    moduleResDTO.setName(module.getName());
    moduleResDTO.setModuleNumber(module.getModuleNumber());
    moduleResDTO.setDescription(module.getDescription());
    moduleResDTO.setShortDescription(module.getShortDescription());
    moduleResDTO.setUpdatedAt(commonService.getFormattedDate(module.getUpdatedAt()));

    return moduleResDTO;
  }

  public List<ModuleResDTO> getAllModules() {
    List<Module> modules = moduleRepository.findAll();
    return modules.stream().map(this::convertToDTO).toList();
  }

  public List<ModuleInfoDTO> getAllModuleInfos() {
    List<Module> modules = moduleRepository.findAll();
    List<ModuleInfoDTO> moduleList = new ArrayList<>();
    for (Module module : modules) {
      ModuleInfoDTO moduleInfo = new ModuleInfoDTO();
      moduleInfo.setId(module.getId());
      moduleInfo.setName(module.getName());
      moduleInfo.setModuleNumber(module.getModuleNumber());

      List<Lecture> lectures = module.getLectures().stream().sorted((l1, l2) -> l1.getLectureNumber().compareToIgnoreCase(l2.getLectureNumber()) ).toList();
      List<LectureInfoDTO> lectureList = new ArrayList<>();
      for (Lecture lecture : lectures) {
        LectureInfoDTO lectureInfo = new LectureInfoDTO();
        lectureInfo.setId(lecture.getId());
        lectureInfo.setName(lecture.getName());
        lectureInfo.setLectureNumber(lecture.getLectureNumber());
        lectureList.add(lectureInfo);
      }
      moduleInfo.setLectures(lectureList);
      moduleList.add(moduleInfo);
    }
    return moduleList.stream().sorted((m1, m2) -> m1.getModuleNumber().compareToIgnoreCase(m2.getModuleNumber())).toList();
  }

  public Module getModuleById(int id) {
    Optional<Module> module = moduleRepository.findById(id);
    return module.orElse(null);
  }

  public ModuleResDTO createModule(ModuleReqDTO moduleReqDTO) {
    Module module = new Module();
    module.setName(moduleReqDTO.getName());
    module.setModuleNumber(moduleReqDTO.getModuleNumber());
    module.setDescription(moduleReqDTO.getDescription());
    module.setShortDescription(moduleReqDTO.getShortDescription());
    module.setCreatedAt(Instant.now());
    module.setUpdatedAt(Instant.now());
    return convertToDTO(moduleRepository.save(module));
  }

  public Optional<ModuleResDTO> updateModule(Integer id, ModuleReqDTO moduleReqDTO) {
    Optional<Module> moduleOptional = moduleRepository.findById(id);
    if (moduleOptional.isPresent()) {
      Module module = moduleOptional.get();
      module.setName(moduleReqDTO.getName());
      module.setModuleNumber(moduleReqDTO.getModuleNumber());
      module.setDescription(moduleReqDTO.getDescription());
      module.setShortDescription(moduleReqDTO.getShortDescription());
      module.setUpdatedAt(Instant.now());
      return Optional.of(convertToDTO(moduleRepository.save(module)));
    }
    return Optional.empty();
  }

  public Optional<ModuleResDTO> deleteModule(Integer id) {
    Optional<Module> moduleOptional = moduleRepository.findById(id);
    if (moduleOptional.isPresent()) {
      Module module = moduleOptional.get();
      moduleRepository.delete(module);
      return Optional.of(convertToDTO(module));
    }
    return Optional.empty();
  }
}
