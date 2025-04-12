package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.*;
import com.example.codecraftapi.services.LectureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("lecture")
public class LectureController {
  private final LectureService lectureService;

  public LectureController(LectureService lectureService) {
    this.lectureService = lectureService;
  }
  @GetMapping
  public ResponseEntity<List<LectureResDTO>> getAllLectures() {
    List<LectureResDTO> lectures = lectureService.getAllLectures();
    return ResponseEntity.ok(lectures);
  }

  @PostMapping("/details")
  private ResponseEntity<LectureDetailsResDTO> getLectureDetails(@RequestBody LectureIdDTO lectureIdDTO) {
    return ResponseEntity.ok(lectureService.getLectureDetails(lectureIdDTO.getLectureId()));
  }

  @PostMapping("/by-module-id")
  private ResponseEntity<List<LectureResDTO>> getLecturesByModuleId(@RequestBody ModuleIdDTO moduleIdDTO) {
    List<LectureResDTO> lectures = lectureService.findByModule(moduleIdDTO.getModuleId());
    return ResponseEntity.ok(lectures);
  }

  @PostMapping
  private ResponseEntity<LectureResDTO> createLecture(@RequestBody LectureReqDTO lectureReqDTO) {
    LectureResDTO lecture = lectureService.createLecture(lectureReqDTO);
    return ResponseEntity.ok(lecture);
  }

  @PutMapping("/{id}")
  private ResponseEntity<LectureResDTO> updateLecture(@PathVariable Integer id, @RequestBody LectureReqDTO lectureReqDTO) {
    LectureResDTO lecture = lectureService.updateLecture(id, lectureReqDTO);
    return ResponseEntity.ok(lecture);
  }

  @DeleteMapping("/{id}")
  private ResponseEntity<LectureResDTO> deleteLecture(@PathVariable Integer id) {
    LectureResDTO lecture = lectureService.deleteLecture(id);
    return ResponseEntity.ok(lecture);
  }
}
