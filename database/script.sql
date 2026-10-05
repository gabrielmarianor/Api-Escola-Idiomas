CREATE DATABASE IF NOT EXISTS escola_idiomas
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE escola_idiomas;

CREATE TABLE IF NOT EXISTS estudante (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nome   VARCHAR(100) NOT NULL,
  idioma VARCHAR(50)  NOT NULL,
  nivel  VARCHAR(30)  NOT NULL
);

INSERT INTO estudante (nome, idioma, nivel) VALUES
  ('Gabriel da Costa', 'Inglês', 'Básico'),
  ('Luiz Felipe', 'Espanhol', 'Intermediário'),
  ('Ana Lívia', 'Francês', 'Avançado');
