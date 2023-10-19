SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Integrador
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Integrador` ;

-- -----------------------------------------------------
-- Schema Integrador
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Integrador` DEFAULT CHARACTER SET utf8 ;
USE `Integrador` ;

--------------------------------------------------------

-- Define las tablas

-- Tabla Cliente
DROP TABLE IF EXISTS `Inegrador`.`Cliente` ;

CREATE TABLE IF NOT EXISTS Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    direccion VARCHAR(30),
    telefono VARCHAR(20),
    correo_electronico VARCHAR(50),
    fecha_de_registro TIMESTAMP
);

-- Tabla Producto
DROP TABLE IF EXISTS `Inegrador`.`Producto` ;
CREATE TABLE IF NOT EXISTS Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    stock_disponible INT
);

-- Tabla Categoria de Producto
DROP TABLE IF EXISTS `Inegrador`.`CategoriaDeProducto` ;
CREATE TABLE IF NOT EXISTS CategoriaDeProducto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30)
);

-- Tabla Pedido
DROP TABLE IF EXISTS `Inegrador`.`Pedido` ;
CREATE TABLE IF NOT EXISTS Pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_del_pedido TIMESTAMP,
    estado VARCHAR(50)
);

-- Tabla Detalle del Pedido
DROP TABLE IF EXISTS `Inegrador`.`DetalleDelPedido` ;
CREATE TABLE IF NOT EXISTS DetalleDelPedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT,
    talla VARCHAR(20),
    precio_unitario DECIMAL(10, 2),
    productoId INT,
    pedidoId INT
);

-- Tabla Inventario
DROP TABLE IF EXISTS `Inegrador`.`Inventario` ;
CREATE TABLE IF NOT EXISTS Inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cantidad_en_stock INT,
    productoId INT
);

-- Tabla Empleado
--DROP TABLE IF EXISTS `Inegrador`.`Empleado` ;
--CREATE TABLE IF NOT EXISTS Empleado (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    nombre VARCHAR(255),
--    apellido VARCHAR(255),
--    direccion VARCHAR(255),
--    telefono VARCHAR(20),
--    correo_electronico VARCHAR(255),
--    cargo VARCHAR(255)
--);

-- Tabla Proveedor
DROP TABLE IF EXISTS `Inegrador`.`Proveedor` ;
CREATE TABLE IF NOT EXISTS Proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_de_la_empresa VARCHAR(50),
    nombre_del_contacto VARCHAR(50),
    telefono_de_contacto VARCHAR(20),
    correo_electronico_de_contacto VARCHAR(50)
);

-- Tabla Rol
DROP TABLE IF EXISTS `Inegrador`.`Rol` ;
CREATE TABLE IF NOT EXISTS Rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Tabla Usuario
DROP TABLE IF EXISTS `Inegrador`.`Usuario` ;
CREATE TABLE IF NOT EXISTS Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    rol INT NOT NULL,
    FOREIGN KEY (rol) REFERENCES Rol(id)
);

-- Define las relaciones

-- Relación Cliente - Pedido
ALTER TABLE Pedido
ADD COLUMN clienteId INT,
ADD FOREIGN KEY (clienteId)
REFERENCES Cliente(id);

-- Relación Pedido - Detalle del Pedido
ALTER TABLE DetalleDelPedido
ADD FOREIGN KEY (pedidoId)
REFERENCES Pedido(id);

-- Relación Producto - Detalle del Pedido
ALTER TABLE DetalleDelPedido
ADD FOREIGN KEY (productoId)
REFERENCES Producto(id);

-- Relación Producto - Inventario
ALTER TABLE Inventario
ADD FOREIGN KEY (productoId)
REFERENCES Producto(id);

-- Relación Producto - Categoria de Producto
ALTER TABLE Producto
ADD COLUMN categoriaDeProductoId INT,
ADD FOREIGN KEY (categoriaDeProductoId)
REFERENCES CategoriaDeProducto(id);

-- Relación Empleado - Pedido
ALTER TABLE Pedido
ADD COLUMN empleadoId INT,
ADD FOREIGN KEY (empleadoId)
REFERENCES Empleado(id);

-- Relación Usuario - Rol
ALTER TABLE Usuario
ADD FOREIGN KEY (rol)
REFERENCES Rol(id);

INSERT INTO `integrador`.`rol` (`id`, `nombre`) VALUES ('1', 'Administrador');
INSERT INTO `integrador`.`rol` (`id`, `nombre`) VALUES ('2', 'Cliente');

