-- Creación de BD

CREATE DATABASE db_desarrollador;
USE db_desarrollador;

-- Creación de tablas

CREATE TABLE IF NOT EXISTS tb_sitio (
    id                  INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre              TINYTEXT,
    agregador           TINYINT(10) UNSIGNED COMMENT "0: No, 1: Sí",
    activo              TINYINT(10) UNSIGNED DEFAULT 1,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tb_idu (
    id	                INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre              TINYTEXT,
    sitio               INT(10) UNSIGNED COMMENT "Relacionado a tb_sitio por id",
    activo              TINYINT(1) UNSIGNED	DEFAULT 1,
    created_at	        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);	
			
			
CREATE TABLE IF NOT EXISTS tb_tipo_servicio (
    id                  INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre	            TINYTEXT,
    activo	            TINYINT(1) UNSIGNED DEFAULT 1,
    created_at	        TIMESTAMP DEFAULT CURRENT_TIMESTAMP	
);
			
CREATE TABLE IF NOT EXISTS tb_servicio (
    id	                INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre	            TINYTEXT,
    tipo_servicio	    INT(10) UNSIGNED COMMENT "Relacionado a tb_tipo_servicio por id",
    activo	            TINYINT(1) UNSIGNED DEFAULT 1,
    created_at	        TIMESTAMP DEFAULT CURRENT_TIMESTAMP	
);
			
CREATE TABLE IF NOT EXISTS tb_datafill (
    id	                INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    servicio	        INT(10) UNSIGNED COMMENT "Relacionado a tb_servicio por id",
    idu	                INT(10) UNSIGNED,
    idu_port_in	        TINYTEXT,		
    idu_port_out	    TINYTEXT,
    salto_datafill	    INT(10) UNSIGNED COMMENT "Relacionado a tb_datafill por id. Indica el salto que se aleja del PE",
    pe_ran	            TINYTEXT COMMENT "Usado en el primer salto",
    pe_ran_port	        TINYTEXT COMMENT "Usado en el primer salto",
    ip_mw_gestion_port	TINYTEXT COMMENT "Usado en el primer salto",
    ip_gateway_mask	    TINYTEXT COMMENT "Usado en el primer salto",	
    activo	            TINYINT(1) UNSIGNED DEFAULT 1,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP	
);