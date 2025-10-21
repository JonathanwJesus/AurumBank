package com.aurum.bank.controller;

import com.aurum.bank.service.PythonIntegrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/correntistas")
@CrossOrigin(origins = "*")
public class CorrentistaController {
    
    private final PythonIntegrationService pythonService;
    
    public CorrentistaController(PythonIntegrationService pythonService) {
        this.pythonService = pythonService;
    }
    
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Map<String, Object> correntistaData) {
        try {
            Object resultado = pythonService.chamarServicoPython("/correntistas", correntistaData);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> listar() {
        try {
            Object resultado = pythonService.chamarServicoPython("/correntistas", null);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}