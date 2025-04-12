package com.example.codecraftapi.controllers;

import com.example.codecraftapi.dto.ModuleInfoDTO;
import com.example.codecraftapi.dto.ModuleReqDTO;
import com.example.codecraftapi.dto.ModuleResDTO;
import com.example.codecraftapi.services.ModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("module")
public class ModuleController {
  private final ModuleService moduleService;

  public ModuleController(ModuleService moduleService) {
    this.moduleService = moduleService;
  }

  @GetMapping
  private ResponseEntity<List<ModuleResDTO>> getAllModules() {
    return ResponseEntity.ok(moduleService.getAllModules());
  }

  @GetMapping("/info")
  private ResponseEntity<List<ModuleInfoDTO>> getAllModuleInfos() {
    return ResponseEntity.ok(moduleService.getAllModuleInfos());
  }


  @PostMapping
  private ResponseEntity<ModuleResDTO> createModule(@RequestBody ModuleReqDTO moduleReqDTO) {
    ModuleResDTO moduleResDTO = moduleService.createModule(moduleReqDTO);
    return ResponseEntity.ok().body(moduleResDTO);
  }

  @PutMapping("/{id}")
  private ResponseEntity<ModuleResDTO> updateModule(@PathVariable Integer id, @RequestBody ModuleReqDTO moduleReqDTO) {
    Optional<ModuleResDTO> moduleResDTOOptional = moduleService.updateModule(id, moduleReqDTO);
    return moduleResDTOOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  private ResponseEntity<ModuleResDTO> deleteModule(@PathVariable Integer id) {
    Optional<ModuleResDTO> moduleResDTOOptional = moduleService.deleteModule(id);
    return moduleResDTOOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }
}
