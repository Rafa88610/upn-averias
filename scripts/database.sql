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

ALTER TABLE `atentodb`.`cliente` 
CHANGE COLUMN `tipoDoc` `tipoDoc` VARCHAR(20) NOT NULL ,
CHANGE COLUMN `numDoc` `numDoc` VARCHAR(30) NOT NULL ,
CHANGE COLUMN `nombres` `nombres` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `apellPaterno` `apellPaterno` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `apellMaterno` `apellMaterno` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `telefono` `telefono` VARCHAR(20) NOT NULL ,
CHANGE COLUMN `direccion` `direccion` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `correo` `correo` VARCHAR(255) NOT NULL ;

CREATE TABLE averia (
    idAveria INT PRIMARY KEY AUTO_INCREMENT,   
    motivo 	VARCHAR(200),
    descripcion VARCHAR(255),
    idAsesor INT,
	idCliente INT,
	idProducto INT,
    nombContacto VARCHAR(100),
    telefContacto VARCHAR(20),
    esDerivado INT default 0,
    FOREIGN KEY (idAsesor) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
);



