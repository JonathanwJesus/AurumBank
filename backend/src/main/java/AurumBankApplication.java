package com.aurum.bank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AurumBankApplication {
    public static void main(String[] args) {
        SpringApplication.run(AurumBankApplication.class, args);
        System.out.println("🚀 Aurum Bank Backend iniciado: http://localhost:8080");
    }
}