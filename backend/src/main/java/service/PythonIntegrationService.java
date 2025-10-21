package com.aurum.bank.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class PythonIntegrationService {
    
    private final RestTemplate restTemplate;
    private final String pythonBaseUrl = "http://localhost:5000/api/python";
    
    public PythonIntegrationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public Object chamarServicoPython(String endpoint, Object data) {
        try {
            String url = pythonBaseUrl + endpoint;
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Object> request = new HttpEntity<>(data, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                url, 
                data == null ? HttpMethod.GET : HttpMethod.POST, 
                request, 
                String.class
            );
            
            return response.getBody();
            
        } catch (Exception e) {
            throw new RuntimeException("Erro na comunicação com serviço Python: " + e.getMessage());
        }
    }
}