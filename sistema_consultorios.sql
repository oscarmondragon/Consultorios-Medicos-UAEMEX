-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2020 a las 21:48:52
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_consultorios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usr` int(11) NOT NULL,
  `nombre_usr` varchar(45) NOT NULL,
  `apPaterno_usr` varchar(45) NOT NULL,
  `apMaterno_usr` varchar(45) NOT NULL,
  `fecha_nacimiento` varchar(45) NOT NULL,
  `sexo_usr` varchar(45) NOT NULL,
  `otro_sexo_usr` varchar(45) NOT NULL,
  `email_usr` varchar(45) NOT NULL,
  `tel_cel_usr` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password_usr` char(255) NOT NULL,
  `fecha_alta_user` date NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  `estatus` varchar(45) NOT NULL,
  `is_admin` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usr`, `nombre_usr`, `apPaterno_usr`, `apMaterno_usr`, `fecha_nacimiento`, `sexo_usr`, `otro_sexo_usr`, `email_usr`, `tel_cel_usr`, `username`, `password_usr`, `fecha_alta_user`, `id_tipo_usuario`, `estatus`, `is_admin`) VALUES
(1, 'Oscar', 'Mondragon', 'Alcantara', '07 mayo 1994', 'Masculino', '', 'oscarmondrragon100@gmail.com', '7121638639', 'omondragona', '$2y$10$5AaTxjSac9PqDIjVbXZ29O1OnD2fIaIIwPmyBpGx7RCJIceJnaeQu', '2020-08-03', 1, 'Activo', 'S');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usr`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
