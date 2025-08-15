-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Out-2021 às 22:40
-- Versão do servidor: 10.4.20-MariaDB
-- versão do PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `login`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `usuario_id` int(11) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `senha` varchar(32) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `telefone` char(15) NOT NULL,
  `data_cadastro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`usuario_id`, `usuario`, `senha`, `nome`, `email`, `telefone`, `data_cadastro`) VALUES
(1, 'pedro', 'fc0f9b76b926b69099d610d919f07ae4', 'Pedro Marchiori Dutra', 'pedromarchiori007@gmail.com', '(11) 94214-8319', '2021-10-06 17:23:43'),
(2, 'pedrodutra', 'fc0f9b76b926b69099d610d919f07ae4', 'Pedro Marchiori Dutra', 'pedromarchiori007@gmail.com', '(11) 94214-8319', '2021-10-06 17:26:22'),
(3, 'pedrodutra69', 'fc0f9b76b926b69099d610d919f07ae4', 'Pedro Marchiori Dutra', 'pedromarchiori007@gmail.com', '(11) 94214-8319', '2021-10-06 17:29:02'),
(4, 'ana123', '314a7457de4445688cd9cedc0c43ed64', 'AnaLucia', 'analucia@hotmail.com', '(11) 11111-1111', '2021-10-06 17:35:36'),
(5, 'pedrodutra77', 'fc0f9b76b926b69099d610d919f07ae4', 'Pedro Marchiori Dutra', 'pedromarchiori007@gmail.com', '(11) 94214-8319', '2021-10-06 17:39:26');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
