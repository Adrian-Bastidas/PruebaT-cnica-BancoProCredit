/*
================================================================================
BANCO PROCREDIT - SISTEMA DE GESTION DE EMPLEADOS
Script de Base de Datos SQL Server
Fecha: 2026
Descripcion: Script completo para crear la BD, tablas, relaciones, SPs y datos
================================================================================
*/

USE master;
GO

-- Borrar BD existente si existe
ALTER DATABASE BancoProcreditDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

DROP DATABASE IF EXISTS BancoProcreditDB;
GO

-- Crear base de datos
CREATE DATABASE BancoProcreditDB;
GO

USE BancoProcreditDB;
GO

-- ============================================================
-- TABLA: DEPARTAMENTOS
-- ============================================================
CREATE TABLE Departamentos (
    DepartamentoID INT PRIMARY KEY IDENTITY(1,1),
    NombreDepartamento NVARCHAR(100) NOT NULL UNIQUE,
    Descripcion NVARCHAR(500),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    Activo BIT DEFAULT 1
);

PRINT 'Tabla Departamentos creada';
GO

-- ============================================================
-- TABLA: CARGOS
-- ============================================================
CREATE TABLE Cargos (
    CargoID INT PRIMARY KEY IDENTITY(1,1),
    NombreCargo NVARCHAR(100) NOT NULL UNIQUE,
    Descripcion NVARCHAR(500),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    Activo BIT DEFAULT 1
);

PRINT 'Tabla Cargos creada';
GO

-- ============================================================
-- TABLA: EMPLEADOS
-- ============================================================
CREATE TABLE Empleados (
    EmpleadoID INT PRIMARY KEY IDENTITY(1,1),
    NumeroDocumento NVARCHAR(20) NOT NULL UNIQUE,
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL,
    Edad INT NOT NULL,
    RemuneracionMensual DECIMAL(12, 2) NOT NULL,
    DepartamentoID INT NOT NULL,
    CargoID INT NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE(),
    Activo BIT DEFAULT 1,
    
    CONSTRAINT FK_Empleados_Departamento FOREIGN KEY (DepartamentoID) 
        REFERENCES Departamentos(DepartamentoID),
    CONSTRAINT FK_Empleados_Cargo FOREIGN KEY (CargoID) 
        REFERENCES Cargos(CargoID),
    CONSTRAINT CK_Empleados_Edad CHECK (Edad >= 18 AND Edad <= 65),
    CONSTRAINT CK_Empleados_Remuneracion CHECK (RemuneracionMensual > 0)
);

PRINT 'Tabla Empleados creada';
GO

-- ============================================================
-- INDICE: Optimizacion de consultas
-- ============================================================
CREATE INDEX IDX_Empleados_NumeroDocumento ON Empleados(NumeroDocumento);
CREATE INDEX IDX_Empleados_DepartamentoID ON Empleados(DepartamentoID);
CREATE INDEX IDX_Empleados_CargoID ON Empleados(CargoID);
CREATE INDEX IDX_Empleados_Nombre ON Empleados(Nombre);
CREATE INDEX IDX_Empleados_Apellido ON Empleados(Apellido);

PRINT 'Indices creados';
GO

-- ============================================================
-- STORED PROCEDURE: SP_GetEmpleados
-- Retorna todos los empleados con info completa (Departamento, Cargo)
-- Parametro opcional: filtrar por DepartamentoID
-- ============================================================
CREATE PROCEDURE SP_GetEmpleados
    @DepartamentoID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        e.EmpleadoID,
        e.NumeroDocumento,
        e.Nombre,
        e.Apellido,
        e.Edad,
        e.RemuneracionMensual,
        d.DepartamentoID,
        d.NombreDepartamento AS Departamento,
        c.CargoID,
        c.NombreCargo AS Cargo,
        e.FechaRegistro,
        e.Activo
    FROM 
        Empleados e
        INNER JOIN Departamentos d ON e.DepartamentoID = d.DepartamentoID
        INNER JOIN Cargos c ON e.CargoID = c.CargoID
    WHERE 
        e.Activo = 1
        AND (@DepartamentoID IS NULL OR e.DepartamentoID = @DepartamentoID)
    ORDER BY 
        e.Nombre, e.Apellido;
END;

PRINT 'SP_GetEmpleados creado';
GO

-- ============================================================
-- STORED PROCEDURE: SP_GetEmpleadosPorDepartamento
-- Retorna empleados filtrados por departamento especifico
-- ============================================================
CREATE PROCEDURE SP_GetEmpleadosPorDepartamento
    @DepartamentoID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        e.EmpleadoID,
        e.NumeroDocumento,
        e.Nombre,
        e.Apellido,
        e.Edad,
        e.RemuneracionMensual,
        d.DepartamentoID,
        d.NombreDepartamento AS Departamento,
        c.CargoID,
        c.NombreCargo AS Cargo,
        e.FechaRegistro
    FROM 
        Empleados e
        INNER JOIN Departamentos d ON e.DepartamentoID = d.DepartamentoID
        INNER JOIN Cargos c ON e.CargoID = c.CargoID
    WHERE 
        e.Activo = 1
        AND e.DepartamentoID = @DepartamentoID
    ORDER BY 
        e.Nombre, e.Apellido;
END;

PRINT 'SP_GetEmpleadosPorDepartamento creado';
GO

-- ============================================================
-- DATOS: INSERCCION DE DEPARTAMENTOS
-- ============================================================
INSERT INTO Departamentos (NombreDepartamento, Descripcion)
VALUES 
    ('Recursos Humanos', 'Departamento de Gestion de Personal y Talento'),
    ('Finanzas', 'Departamento de Finanzas y Tesoreria'),
    ('Contabilidad', 'Departamento de Contabilidad y Control Financiero'),
    ('Marketing', 'Departamento de Marketing y Comunicaciones'),
    ('Sistemas', 'Departamento de Tecnologia e Infraestructura'),
    ('Banca Empresas', 'Area de Servicios a Empresas e Institucionales'),
    ('Banca Personas', 'Area de Servicios a Personas y Consumo');

PRINT 'Departamentos insertados: 7 registros';
GO

-- ============================================================
-- DATOS: INSERCCION DE CARGOS
-- ============================================================
INSERT INTO Cargos (NombreCargo, Descripcion)
VALUES 
    ('Analista de Recursos Humanos', 'Profesional en gestion de talento y reclutamiento'),
    ('Contador Senior', 'Contador con experiencia en reportes financieros'),
    ('Supervisor de Creditos', 'Supervisor de operaciones crediticias y cobranza'),
    ('Diseñador UX/UI', 'Diseñador de experiencia de usuario y interfaz'),
    ('Especialista de Sistemas', 'Especialista en infraestructura TI y redes'),
    ('Ejecutivo de Ventas', 'Ejecutivo comercial de servicios bancarios'),
    ('Asistente Administrativo', 'Apoyo administrativo general y coordinacion'),
    ('Gerente de Area', 'Gestor y coordinador de departamento');

PRINT 'Cargos insertados: 8 registros';
GO

-- ============================================================
-- DATOS: INSERCCION DE EMPLEADOS
-- ============================================================
INSERT INTO Empleados (NumeroDocumento, Nombre, Apellido, Edad, RemuneracionMensual, DepartamentoID, CargoID)
VALUES 
    ('1234567890', 'Juan', 'Garcia', 35, 2500.00, 1, 1),
    ('1234567891', 'Maria', 'Lopez', 40, 3000.00, 2, 2),
    ('1234567892', 'Carlos', 'Rodriguez', 38, 2800.00, 3, 2),
    ('1234567893', 'Ana', 'Martinez', 30, 2200.00, 4, 7),
    ('1234567894', 'Pedro', 'Sanchez', 42, 3200.00, 5, 5),
    ('1234567895', 'Laura', 'Gonzalez', 32, 2100.00, 6, 6),
    ('1234567896', 'Diego', 'Fernandez', 28, 1900.00, 7, 6),
    ('1234567897', 'Sofia', 'Ramirez', 36, 2600.00, 1, 8),
    ('1234567898', 'Miguel', 'Torres', 45, 3500.00, 2, 8),
    ('1234567899', 'Elena', 'Castro', 31, 2300.00, 5, 4);

PRINT 'Empleados insertados: 10 registros';
GO

-- ============================================================
-- VERIFICACION FINAL
-- ============================================================
PRINT '';
PRINT '====== BASE DE DATOS CREADA EXITOSAMENTE ======';
PRINT '';
PRINT 'TABLAS CREADAS:';
PRINT '  - Departamentos (7 registros)';
PRINT '  - Cargos (8 registros)';
PRINT '  - Empleados (10 registros)';
PRINT '';
PRINT 'STORED PROCEDURES CREADOS:';
PRINT '  - SP_GetEmpleados';
PRINT '  - SP_GetEmpleadosPorDepartamento';
PRINT '';
PRINT 'INDICES CREADOS:';
PRINT '  - IDX_Empleados_NumeroDocumento';
PRINT '  - IDX_Empleados_DepartamentoID';
PRINT '  - IDX_Empleados_CargoID';
PRINT '  - IDX_Empleados_Nombre';
PRINT '  - IDX_Empleados_Apellido';
PRINT '';
PRINT '====== LISTA DE EJEMPLO DE EMPLEADOS ======';
GO

USE BancoProcreditDB;
GO

SELECT 
    e.EmpleadoID,
    e.NumeroDocumento,
    CONCAT(e.Nombre, ' ', e.Apellido) AS NombreCompleto,
    e.Edad,
    e.RemuneracionMensual,
    d.NombreDepartamento,
    c.NombreCargo
FROM Empleados e
INNER JOIN Departamentos d ON e.DepartamentoID = d.DepartamentoID
INNER JOIN Cargos c ON e.CargoID = c.CargoID
ORDER BY e.Nombre;
