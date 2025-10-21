package com.aurum.bank.repository;

import com.aurum.bank.entity.Correntista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CorrentistaRepository extends JpaRepository<Correntista, Long> {
    Optional<Correntista> findByCpf(String cpf);
    boolean existsByCpf(String cpf);
}