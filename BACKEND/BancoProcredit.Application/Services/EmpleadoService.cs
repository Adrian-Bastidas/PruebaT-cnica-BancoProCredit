using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Exceptions;
using BancoProcredit.Domain.Entities;
using BancoProcredit.Domain.Interfaces;

namespace BancoProcredit.Application.Services
{
    public class EmpleadoService : IEmpleadoService
    {
        private readonly IEmpleadoRepository _empleadoRepository;
        private readonly IDepartamentoRepository _departamentoRepository;
        private readonly ICargoRepository _cargoRepository;
        private readonly IMapper _mapper;

        public EmpleadoService(
            IEmpleadoRepository empleadoRepository,
            IDepartamentoRepository departamentoRepository,
            ICargoRepository cargoRepository,
            IMapper mapper)
        {
            _empleadoRepository = empleadoRepository;
            _departamentoRepository = departamentoRepository;
            _cargoRepository = cargoRepository;
            _mapper = mapper;
        }

        // LINQ en Service: Obtener todos
        public async Task<IEnumerable<EmpleadoDTO>> GetAllAsync()
        {
            var empleados = await _empleadoRepository.GetAllAsync();

            // LINQ: Transformar entities a DTOs
            return empleados
                .Select(e => new EmpleadoDTO
                {
                    EmpleadoID = e.EmpleadoID,
                    NumeroDocumento = e.NumeroDocumento,
                    Nombre = e.Nombre,
                    Apellido = e.Apellido,
                    Edad = e.Edad,
                    RemuneracionMensual = e.RemuneracionMensual,
                    DepartamentoID = e.DepartamentoID,
                    Departamento = e.Departamento?.NombreDepartamento,
                    CargoID = e.CargoID,
                    Cargo = e.Cargo?.NombreCargo,
                    FechaRegistro = e.FechaRegistro,
                    Activo = e.Activo
                })
                .OrderBy(e => e.Nombre)
                .ThenBy(e => e.Apellido)
                .ToList();
        }

        // Obtener por ID
        public async Task<EmpleadoDTO> GetByIdAsync(int id)
        {
            var empleado = await _empleadoRepository.GetByIdAsync(id);

            if (empleado == null)
                throw new AppException($"Empleado con ID {id} no encontrado");

            return _mapper.Map<EmpleadoDTO>(empleado);
        }

        // LINQ en Service: Filtrar por departamento
        public async Task<IEnumerable<EmpleadoDTO>> GetByDepartamentoAsync(int departamentoId)
        {
            // Validar que departamento existe
            var departamentoExiste = await _departamentoRepository.ExisteAsync(departamentoId);
            if (!departamentoExiste)
                throw new AppException($"Departamento con ID {departamentoId} no existe");

            var empleados = await _empleadoRepository.GetByDepartamentoAsync(departamentoId);

            // LINQ: Transformar y filtrar
            return empleados
                .Select(e => new EmpleadoDTO
                {
                    EmpleadoID = e.EmpleadoID,
                    NumeroDocumento = e.NumeroDocumento,
                    Nombre = e.Nombre,
                    Apellido = e.Apellido,
                    Edad = e.Edad,
                    RemuneracionMensual = e.RemuneracionMensual,
                    DepartamentoID = e.DepartamentoID,
                    Departamento = e.Departamento?.NombreDepartamento,
                    CargoID = e.CargoID,
                    Cargo = e.Cargo?.NombreCargo,
                    FechaRegistro = e.FechaRegistro,
                    Activo = e.Activo
                })
                .OrderBy(e => e.RemuneracionMensual)
                .ThenBy(e => e.Nombre)
                .ToList();
        }

        // LINQ en Service: Crear empleado con validaciones
        public async Task<EmpleadoDTO> CreateAsync(CreateEmpleadoDTO dto)
        {
            // Validar documento único
            var documentoExiste = await _empleadoRepository.DocumentoExisteAsync(dto.NumeroDocumento);
            if (documentoExiste)
                throw new AppException($"El documento {dto.NumeroDocumento} ya existe");

            // Validar departamento existe
            var departamentoExiste = await _departamentoRepository.ExisteAsync(dto.DepartamentoID);
            if (!departamentoExiste)
                throw new AppException($"Departamento con ID {dto.DepartamentoID} no existe");

            // Validar cargo existe
            var cargoExiste = await _cargoRepository.ExisteAsync(dto.CargoID);
            if (!cargoExiste)
                throw new AppException($"Cargo con ID {dto.CargoID} no existe");

            // Mapear y crear
            var empleado = _mapper.Map<Empleado>(dto);
            var id = await _empleadoRepository.CreateAsync(empleado);

            // Retornar creado
            return new EmpleadoDTO
            {
                EmpleadoID = id,
                NumeroDocumento = dto.NumeroDocumento,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Edad = dto.Edad,
                RemuneracionMensual = dto.RemuneracionMensual,
                DepartamentoID = dto.DepartamentoID,
                CargoID = dto.CargoID,
                FechaRegistro = DateTime.Now,
                Activo = true
            };
        }

        // Actualizar empleado
        public async Task<bool> UpdateAsync(int id, CreateEmpleadoDTO dto)
        {
            var empleado = await _empleadoRepository.GetByIdAsync(id);
            if (empleado == null)
                throw new AppException($"Empleado con ID {id} no encontrado");

            // Validar documento si cambió
            if (empleado.NumeroDocumento != dto.NumeroDocumento)
            {
                var documentoExiste = await _empleadoRepository.DocumentoExisteAsync(dto.NumeroDocumento);
                if (documentoExiste)
                    throw new AppException($"El documento {dto.NumeroDocumento} ya existe");
            }

            // Validar departamento y cargo
            var departamentoExiste = await _departamentoRepository.ExisteAsync(dto.DepartamentoID);
            if (!departamentoExiste)
                throw new AppException($"Departamento con ID {dto.DepartamentoID} no existe");

            var cargoExiste = await _cargoRepository.ExisteAsync(dto.CargoID);
            if (!cargoExiste)
                throw new AppException($"Cargo con ID {dto.CargoID} no existe");

            // Actualizar propiedades
            empleado.NumeroDocumento = dto.NumeroDocumento;
            empleado.Nombre = dto.Nombre;
            empleado.Apellido = dto.Apellido;
            empleado.Edad = dto.Edad;
            empleado.RemuneracionMensual = dto.RemuneracionMensual;
            empleado.DepartamentoID = dto.DepartamentoID;
            empleado.CargoID = dto.CargoID;

            return await _empleadoRepository.UpdateAsync(empleado);
        }

        // Eliminar empleado
        public async Task<bool> DeleteAsync(int id)
        {
            return await _empleadoRepository.DeleteAsync(id);
        }

        // Verificar documento
        public async Task<bool> DocumentoExisteAsync(string numeroDocumento)
        {
            return await _empleadoRepository.DocumentoExisteAsync(numeroDocumento);
        }
        public async Task<PaginatedResponseDTO<EmpleadoDTO>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var (empleados, total) = await _empleadoRepository.GetAllPaginatedAsync(pageNumber, pageSize);

            // LINQ: Transformar a DTO
            var dtos = empleados
                .Select(e => new EmpleadoDTO
                {
                    EmpleadoID = e.EmpleadoID,
                    NumeroDocumento = e.NumeroDocumento,
                    Nombre = e.Nombre,
                    Apellido = e.Apellido,
                    Edad = e.Edad,
                    RemuneracionMensual = e.RemuneracionMensual,
                    DepartamentoID = e.DepartamentoID,
                    Departamento = e.Departamento?.NombreDepartamento,
                    CargoID = e.CargoID,
                    Cargo = e.Cargo?.NombreCargo,
                    FechaRegistro = e.FechaRegistro,
                    Activo = e.Activo
                })
                .ToList();

            return new PaginatedResponseDTO<EmpleadoDTO>(dtos, pageNumber, pageSize, total);
        }

        public async Task<PaginatedResponseDTO<EmpleadoDTO>> GetByDepartamentoPaginatedAsync(int departamentoId, int pageNumber, int pageSize)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var departamentoExiste = await _departamentoRepository.ExisteAsync(departamentoId);
            if (!departamentoExiste)
                throw new AppException($"Departamento con ID {departamentoId} no existe");

            var (empleados, total) = await _empleadoRepository.GetByDepartamentoPaginatedAsync(departamentoId, pageNumber, pageSize);

            // LINQ: Transformar a DTO
            var dtos = empleados
                .Select(e => new EmpleadoDTO
                {
                    EmpleadoID = e.EmpleadoID,
                    NumeroDocumento = e.NumeroDocumento,
                    Nombre = e.Nombre,
                    Apellido = e.Apellido,
                    Edad = e.Edad,
                    RemuneracionMensual = e.RemuneracionMensual,
                    DepartamentoID = e.DepartamentoID,
                    Departamento = e.Departamento?.NombreDepartamento,
                    CargoID = e.CargoID,
                    Cargo = e.Cargo?.NombreCargo,
                    FechaRegistro = e.FechaRegistro,
                    Activo = e.Activo
                })
                .ToList();

            return new PaginatedResponseDTO<EmpleadoDTO>(dtos, pageNumber, pageSize, total);
        }
    }
}