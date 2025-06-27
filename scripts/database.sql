CREATE DATABASE atentodb;

USE atentodb;

CREATE TABLE cliente (
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    tipoDoc VARCHAR(20),
    numDoc VARCHAR(30),
    nombres VARCHAR(50),
    apellPaterno VARCHAR(100),
    apellMaterno VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(100),
    correo VARCHAR(255)
);


CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(225),
    contrasenia VARCHAR(225),    
    rol VARCHAR(50),
    estado VARCHAR(20)
);


CREATE TABLE producto (
    idProducto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    estado VARCHAR(10) default 'A'
);