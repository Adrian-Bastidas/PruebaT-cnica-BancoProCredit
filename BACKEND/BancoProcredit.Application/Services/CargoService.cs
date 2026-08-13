using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Exceptions;
using BancoProcredit.Domain.Interfaces;

namespace BancoProcredit.Application.Services
{
    public class CargoService : ICargoService
    {
        private readonly ICargoRepository _repository;
        private readonly IMapper _mapper;

        public CargoService(ICargoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // LINQ: Obtener todos
        public async Task<IEnumerable<CargoDTO>> GetAllAsync()
        {
            var cargos = await _repository.GetAllAsync();

            return cargos
                .Select(c => new CargoDTO
                {
                    CargoID = c.CargoID,
                    NombreCargo = c.NombreCargo,
                    Descripcion = c.Descripcion
                })
                .OrderBy(c => c.NombreCargo)
                .ToList();
        }

        // Obtener por ID
        public async Task<CargoDTO> GetByIdAsync(int id)
        {
            var cargo = await _repository.GetByIdAsync(id);

            if (cargo == null)
                throw new AppException($"Cargo con ID {id} no encontrado");

            return _mapper.Map<CargoDTO>(cargo);
        }
    }
}