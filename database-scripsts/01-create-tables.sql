

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS bankaurum;
USE bankaurum;

CREATE TABLE Correntista (
    id_correntista BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    cpf CHAR(11) UNIQUE,
    email VARCHAR(150),
    telefone VARCHAR(50),
    data_nascimento DATE,
    endereco VARCHAR(300),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE ContaCorrente (
    id_conta BIGINT AUTO_INCREMENT PRIMARY KEY,
    agencia VARCHAR(20) NOT NULL,
    numero_conta VARCHAR(50) NOT NULL,
    id_correntista BIGINT NOT NULL,
    saldo DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    ativa BOOLEAN NOT NULL DEFAULT TRUE,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_agencia_numero (agencia, numero_conta),
    CONSTRAINT fk_conta_correntista FOREIGN KEY (id_correntista) REFERENCES Correntista(id_correntista) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE TiposTransacao (
    id_tipo_transacao BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    natureza VARCHAR(50),
    ativo BOOLEAN DEFAULT TRUE,
    conta_destino_req BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

CREATE TABLE Movimentos (
    id_movimento BIGINT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(18,2) NOT NULL,
    id_conta_origem BIGINT NULL,
    id_conta_destino BIGINT NULL,
    data_movimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao VARCHAR(255),
    id_tipo_transacao BIGINT NOT NULL,
    CONSTRAINT fk_mov_origem FOREIGN KEY (id_conta_origem) REFERENCES ContaCorrente(id_conta) ON DELETE SET NULL,
    CONSTRAINT fk_mov_destino FOREIGN KEY (id_conta_destino) REFERENCES ContaCorrente(id_conta) ON DELETE SET NULL,
    CONSTRAINT fk_mov_tipo FOREIGN KEY (id_tipo_transacao) REFERENCES TiposTransacao(id_tipo_transacao)
) ENGINE=InnoDB;

CREATE TABLE Extrato (
    id_extrato BIGINT AUTO_INCREMENT PRIMARY KEY,
    periodo_inicio DATE,
    periodo_fim DATE,
    id_conta BIGINT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_extrato_conta FOREIGN KEY (id_conta) REFERENCES ContaCorrente(id_conta) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Associação Movimentos <-> Extrato (many-to-many via tabela auxiliar)
CREATE TABLE Extrato_Movimentos (
    id_extrato BIGINT NOT NULL,
    id_movimento BIGINT NOT NULL,
    PRIMARY KEY (id_extrato, id_movimento),
    CONSTRAINT fk_em_extrato FOREIGN KEY (id_extrato) REFERENCES Extrato(id_extrato) ON DELETE CASCADE,
    CONSTRAINT fk_em_mov FOREIGN KEY (id_movimento) REFERENCES Movimentos(id_movimento) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Inserts básicos de TiposTransacao
INSERT INTO TiposTransacao (nome, natureza, ativo, conta_destino_req) VALUES
('DEPOSITO','CREDITO',TRUE, FALSE),
('SAQUE','DEBITO',TRUE, FALSE),
('TRANSFERENCIA','TRANSFER',TRUE, TRUE),
('PIX','TRANSFER',TRUE, TRUE),
('TAXA','DEBITO',TRUE, FALSE);