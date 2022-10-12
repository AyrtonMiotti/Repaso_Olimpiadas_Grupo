drop database if exists Repaso_olimpiadas;
CREATE DATABASE Repaso_olimpiadas;
USE Repaso_olimpiadas;
	
	
CREATE TABLE personas(
	DNI INT NOT NULL,
	usuario VARCHAR(15),
	nombre VARCHAR (20),
	apellido VARCHAR (20),
	PRIMARY KEY (DNI)
	);
	
	
CREATE TABLE equipos(
	id INT AUTO_INCREMENT,
	nombre VARCHAR(20),
	persona INT,
	PRIMARY KEY (id),
	FOREIGN KEY (persona) REFERENCES personas(DNI));
