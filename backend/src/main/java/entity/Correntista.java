package com.aurum.bank.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "correntista")
@Data
public class Correntista {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_correntista")
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(unique = true, nullable = false, length = 11)
    private String cpf;
    
    @Column(length = 100)
    private String email;
    
    @Column(length = 20)
    private String telefone;
    
    @Column(name = "data_nascimento")
    private java.sql.Date dataNascimento;
    
    @Column(columnDefinition = "TEXT")
    private String endereco;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();
}