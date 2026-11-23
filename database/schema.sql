DROP DATABASE energytrack_db;
CREATE DATABASE IF NOT EXISTS energytrack_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE energytrack_db;

CREATE TABLE IF NOT EXISTS maquinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  setor VARCHAR(80) NOT NULL,
  status ENUM('ativa', 'inativa') NOT NULL DEFAULT 'ativa'
);

CREATE TABLE IF NOT EXISTS leituras_energia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  maquina_id INT NOT NULL,
  data_leitura DATE NOT NULL,
  consumo_kwh DECIMAL(10, 2) NOT NULL,
  horas_operacao DECIMAL(8, 2) NOT NULL,
  CONSTRAINT fk_leituras_maquinas
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
