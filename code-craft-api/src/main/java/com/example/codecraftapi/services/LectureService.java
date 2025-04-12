package com.example.codecraftapi.services;


import com.example.codecraftapi.dto.*;
import com.example.codecraftapi.model.Lecture;
import com.example.codecraftapi.model.LectureNoteFileStorage;
import com.example.codecraftapi.model.Problem;
import com.example.codecraftapi.repositories.LectureNoteFileStorageRepository;
import com.example.codecraftapi.repositories.LectureRepository;
import org.springframework.stereotype.Service;
import com.example.codecraftapi.model.Module;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class LectureService {

  private final LectureRepository lectureRepository;
  private final CommonService commonService;
  private final ModuleService moduleService;
  private final LectureNoteFileStorageRepository lectureNoteFileStorageRepository;

  public LectureService(LectureRepository lectureRepository, CommonService commonService, ModuleService moduleService, LectureNoteFileStorageRepository lectureNoteFileStorageRepository) {
    this.lectureRepository = lectureRepository;
    this.commonService = commonService;
    this.moduleService = moduleService;
    this.lectureNoteFileStorageRepository = lectureNoteFileStorageRepository;
  }

  private LectureResDTO convertToDTO(Lecture lecture) {
    LectureResDTO lectureResDTO = new LectureResDTO();
    FileResDTO lectureFileResDTO = getFileResDTO(lecture);


    lectureResDTO.setId(lecture.getId());
    lectureResDTO.setName(lecture.getName());
    lectureResDTO.setLectureNumber(lecture.getLectureNumber());
    lectureResDTO.setDescription(lecture.getDescription());
    lectureResDTO.setUpdatedAt(commonService.getFormattedDate(lecture.getUpdatedAt()));
    lectureResDTO.setNotes(lecture.getNotes());
    lectureResDTO.setModuleNumber(lecture.getModule().getModuleNumber());
    lectureResDTO.setModuleId(lecture.getModule().getId());
    lectureResDTO.setFileInfo(lectureFileResDTO);
    return lectureResDTO;
  }

  public ProblemResDTO convertToDTO(Problem problem) {
    ProblemResDTO problemResDTO = new ProblemResDTO();

    problemResDTO.setId(problem.getId());
    problemResDTO.setProblemNumber(problem.getProblemNumber());
    problemResDTO.setName(problem.getName());
    problemResDTO.setDescription(problem.getDescription());
    problemResDTO.setConstraints(problem.getConstraints());
    problemResDTO.setProblemModeId(problem.getProblemMode().getId());
    problemResDTO.setProblemTypeId(problem.getProblemType().getId());
    problemResDTO.setLectureId(problem.getLecture().getId());
    problemResDTO.setLectureNumber(problem.getLecture().getLectureNumber());
    problemResDTO.setUpdatedAt(commonService.getFormattedDate(problem.getUpdatedAt()));
    problemResDTO.setModuleId(problem.getLecture().getModule().getId());
    problemResDTO.setProblemType(problem.getProblemType().getName());
    problemResDTO.setProblemMode(problem.getProblemMode().getName());

    return problemResDTO;
  }


  private static FileResDTO getFileResDTO(Lecture lecture) {
    FileResDTO lectureFileResDTO = new FileResDTO();

    lectureFileResDTO.setName(lecture.getLectureNoteFileStorage().getFileName());
    lectureFileResDTO.setOriginalName(lecture.getLectureNoteFileStorage().getFileOriginalName());
    lectureFileResDTO.setUrl(lecture.getLectureNoteFileStorage().getUrl());
    lectureFileResDTO.setSize(lecture.getLectureNoteFileStorage().getSize());
    lectureFileResDTO.setContentType(lecture.getLectureNoteFileStorage().getContentType());
    lectureFileResDTO.setId(lecture.getLectureNoteFileStorage().getId());
    return lectureFileResDTO;
  }

  public List<LectureResDTO> getAllLectures() {
    List<Lecture> lectures = lectureRepository.findAll();
    return lectures.stream().map(this::convertToDTO).toList();
  }

  public List<LectureResDTO> findByModule(Integer moduleId) {
    List<Lecture> lectures = lectureRepository.findByModuleId(moduleId);
    return lectures.stream().map(this::convertToDTO).toList();
  }

  public LectureDetailsResDTO getLectureDetails(Integer lectureId) {
    Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);

    if (lectureOptional.isPresent()) {
      Lecture lecture = lectureOptional.get();
      LectureDetailsResDTO lectureDetailsResDTO = new LectureDetailsResDTO();
      lectureDetailsResDTO.setId(lecture.getId());
      lectureDetailsResDTO.setName(lecture.getName());
      lectureDetailsResDTO.setLectureNumber(lecture.getLectureNumber());
      lectureDetailsResDTO.setDescription(lecture.getDescription());
      lectureDetailsResDTO.setModuleName(lecture.getModule().getName());
      lectureDetailsResDTO.setModuleNumber(lecture.getModule().getModuleNumber());
      lectureDetailsResDTO.setNotes(lecture.getNotes());
      lectureDetailsResDTO.setPdfUrl(lecture.getLectureNoteFileStorage().getUrl());
      lectureDetailsResDTO.setFileName(lecture.getLectureNoteFileStorage().getFileName());
      lectureDetailsResDTO.setModuleShortDescription(lecture.getModule().getShortDescription());

      List<Problem> assignmentProblems = lectureRepository.findAssignmentProblemsByLectureId(lectureId);
      List<Problem> additionalProblems = lectureRepository.findAdditionalProblemsByLectureId(lectureId);
      List<Problem> lectureProblems = lectureRepository.findLectureProblemsByLectureId(lectureId);

      lectureDetailsResDTO.setLectureProblems(lectureProblems.stream().map(this::convertToDTO).toList());
      lectureDetailsResDTO.setAssignmentProblems(assignmentProblems.stream().map(this::convertToDTO).toList());
      lectureDetailsResDTO.setAdditionalProblems(additionalProblems.stream().map(this::convertToDTO).toList());

      return lectureDetailsResDTO;
    }

    return null;
  }

  private Module getModuleById(String moduleIdString) {
    int moduleId = Integer.parseInt(moduleIdString);
    return moduleService.getModuleById(moduleId);
  }

  public LectureResDTO createLecture(LectureReqDTO lectureReqDTO) {
    Lecture lecture = new Lecture();
    Module module = getModuleById(lectureReqDTO.getModuleId());
    LectureNoteFileStorage lectureNoteFileStorage = new LectureNoteFileStorage();

    lecture.setName(lectureReqDTO.getName());
    lecture.setLectureNumber(lectureReqDTO.getLectureNumber());
    lecture.setDescription(lectureReqDTO.getDescription());
    lecture.setNotes(lectureReqDTO.getNotes());
    lecture.setCreatedAt(Instant.now());
    lecture.setUpdatedAt(Instant.now());
    if (module != null) {
      lecture.setModule(module);
    } else {
      return null;
    }

    lectureNoteFileStorage.setFileName(lectureReqDTO.getFileName());
    lectureNoteFileStorage.setFileOriginalName(lectureReqDTO.getFileOriginalName());
    lectureNoteFileStorage.setSize(lectureReqDTO.getSize());
    lectureNoteFileStorage.setContentType(lectureReqDTO.getContentType());
    lectureNoteFileStorage.setUrl(lectureReqDTO.getUrl());
    lectureNoteFileStorage.setCreatedAt(Instant.now());
    lectureNoteFileStorage.setUpdatedAt(Instant.now());
    LectureNoteFileStorage createdLectureNoteFileStorage = lectureNoteFileStorageRepository.save(lectureNoteFileStorage);

    lecture.setLectureNoteFileStorage(createdLectureNoteFileStorage);

    Lecture createdLecture = lectureRepository.save(lecture);
    return convertToDTO(createdLecture);
  }

  public Lecture getLectureById(Integer lectureId) {
    Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
    return lectureOptional.orElse(null);
  }

  public LectureResDTO updateLecture(Integer id,LectureReqDTO lectureReqDTO) {
    Optional<Lecture> lectureOptional = lectureRepository.findById(id);
    if (lectureOptional.isPresent()) {
      Lecture lecture = lectureOptional.get();
      Module module = getModuleById(lectureReqDTO.getModuleId());
      Optional<LectureNoteFileStorage> lectureNoteFileStorageOptional = lectureNoteFileStorageRepository.findById(lecture.getLectureNoteFileStorage().getId());

      lecture.setName(lectureReqDTO.getName());
      lecture.setLectureNumber(lectureReqDTO.getLectureNumber());
      lecture.setDescription(lectureReqDTO.getDescription());
      lecture.setNotes(lectureReqDTO.getNotes());
      lecture.setUpdatedAt(Instant.now());
      if (module != null) {
        lecture.setModule(module);
      }

      if (lectureNoteFileStorageOptional.isPresent()) {
        LectureNoteFileStorage lectureNoteFileStorage = lectureNoteFileStorageOptional.get();
        lectureNoteFileStorage.setFileName(lectureReqDTO.getFileName());
        lectureNoteFileStorage.setFileOriginalName(lectureReqDTO.getFileOriginalName());
        lectureNoteFileStorage.setSize(lectureReqDTO.getSize());
        lectureNoteFileStorage.setContentType(lectureReqDTO.getContentType());
        lectureNoteFileStorage.setUrl(lectureReqDTO.getUrl());
        lectureNoteFileStorage.setUpdatedAt(Instant.now());

        lectureNoteFileStorageRepository.save(lectureNoteFileStorage);
        lecture.setLectureNoteFileStorage(lectureNoteFileStorage);
      }

      return convertToDTO(lectureRepository.save(lecture));
    }

    return null;
  }

  public LectureResDTO deleteLecture(Integer id) {
    Optional<Lecture> lectureOptional = lectureRepository.findById(id);
    if (lectureOptional.isPresent()) {
      Lecture lecture = lectureOptional.get();
      lectureRepository.delete(lecture);
      return convertToDTO(lecture);
    }

    return null;
  }
}
