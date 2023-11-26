-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/11/2023 às 22:06
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `drivescript`
--

-- --------------------------------------------------------

--
-- Verificar se a tabela `agendamentos` existe antes de criar
--
SELECT COUNT(*) INTO @agendamentos_count FROM information_schema.tables WHERE table_schema = 'drivescript' AND table_name = 'agendamentos';
SET @agendamentos_exists = IF(@agendamentos_count > 0, 1, 0);

IF @agendamentos_exists = 0 THEN
    CREATE TABLE `agendamentos` (
      `id` int(11) NOT NULL,
      `aluno_id` int(11) NOT NULL,
      `carro_id` int(11) NOT NULL,
      `data_aula` date NOT NULL,
      `horario_aula` time NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    
    ALTER TABLE `agendamentos`
      ADD PRIMARY KEY (`id`),
      ADD KEY `aluno_id` (`aluno_id`),
      ADD KEY `carro_id` (`carro_id`);

    ALTER TABLE `agendamentos`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
    
    ALTER TABLE `agendamentos`
      ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`),
      ADD CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`carro_id`) REFERENCES `carros` (`id`);
    
    INSERT INTO `agendamentos` VALUES (1, 1, 1, '2023-01-01', '12:00:00');
END IF;

-- --------------------------------------------------------

--
-- Verificar se a tabela `alunos` existe antes de criar
--
SELECT COUNT(*) INTO @alunos_count FROM information_schema.tables WHERE table_schema = 'drivescript' AND table_name = 'alunos';
SET @alunos_exists = IF(@alunos_count > 0, 1, 0);

IF @alunos_exists = 0 THEN
    CREATE TABLE `alunos` (
      `id` int(11) NOT NULL,
      `nome` varchar(100) NOT NULL,
      `cpf` varchar(14) NOT NULL,
      `data_nascimento` date NOT NULL,
      `endereco` varchar(255) NOT NULL,
      `telefone` varchar(15) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    ALTER TABLE `alunos`
      ADD PRIMARY KEY (`id`);

    ALTER TABLE `alunos`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
    
    INSERT INTO `alunos` VALUES (1, 'João da Silvsa', '123.456.789-00', '0000-00-00', 'Rua Principal, 123', '(11) 98765-0');
END IF;

-- --------------------------------------------------------

--
-- Verificar se a tabela `carros` existe antes de criar
--
SELECT COUNT(*) INTO @carros_count FROM information_schema.tables WHERE table_schema = 'drivescript' AND table_name = 'carros';
SET @carros_exists = IF(@carros_count > 0, 1, 0);

IF @carros_exists = 0 THEN
    CREATE TABLE `carros` (
      `id` int(11) NOT NULL,
      `marca` varchar(50) NOT NULL,
      `modelo` varchar(50) NOT NULL,
      `ano` int(11) NOT NULL,
      `placa` varchar(10) NOT NULL,
      `capacidade_passageiros` int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    ALTER TABLE `carros`
      ADD PRIMARY KEY (`id`);

    ALTER TABLE `carros`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
    
    INSERT INTO `carros` VALUES (1, 'Marca1', 'Modelo1', 2020, 'ABC1234', 4);
END IF;

-- --------------------------------------------------------

--
-- Verificar se a tabela `usuarios` existe antes de criar
--
SELECT COUNT(*) INTO @usuarios_count FROM information_schema.tables WHERE table_schema = 'drivescript' AND table_name = 'usuarios';
SET @usuarios_exists = IF(@usuarios_count > 0, 1, 0);

IF @usuarios_exists = 0 THEN
    CREATE TABLE `usuarios` (
      `id` int(11) NOT NULL,
      `username` varchar(255) NOT NULL,
      `password` varchar(255) NOT NULL,
      `nivel_perm` int(11) DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    ALTER TABLE `usuarios`
      ADD PRIMARY KEY (`id`);

    ALTER TABLE `usuarios`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
    
    INSERT INTO `usuarios` VALUES (1, 'admin', 'admin', 0),
                                  (2, 'aluno', 'aluno', 1);
END IF;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
