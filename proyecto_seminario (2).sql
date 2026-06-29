-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-06-2026 a las 21:39:41
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_seminario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacoras`
--

CREATE TABLE `bitacoras` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `campus` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `hora_llegada` time NOT NULL,
  `hora_salida` time NOT NULL,
  `objetivo` text NOT NULL,
  `actividades` text NOT NULL,
  `resultados` text NOT NULL,
  `notas` text NOT NULL,
  `firma_campus` longtext NOT NULL,
  `firma_carrera` longtext NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(30) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estatus` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `rol`, `correo`, `estatus`, `telefono`) VALUES
(1, 'profesor', '123', 'maestro', 'profe@escuela.com', 'activo', '12345678'),
(2, 'alumno1', '123', 'alumno', 'alumno@escuela.com', 'activo', '12345678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacoras`
--
ALTER TABLE `bitacoras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacoras`
--
ALTER TABLE `bitacoras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
