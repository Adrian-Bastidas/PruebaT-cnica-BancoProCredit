using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Exceptions;
using BancoProcredit.Domain.Interfaces;

namespace BancoProcredit.Application.Services
{
    public class DepartamentoService : IDepartamentoService
    {
        private readonly IDepartamentoRepository _repository;
        private readonly IMapper _mapper;

        public DepartamentoService(IDepartamentoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // LINQ: Obtener todos
        public async Task<IEnumerable<DepartamentoDTO>> GetAllAsync()
        {
            var departamentos = await _repository.GetAllAsync();

            return departamentos
                .Select(d => new DepartamentoDTO
                {
                    DepartamentoID = d.DepartamentoID,
                    NombreDepartamento = d.NombreDepartamento,
                    Descripcion = d.Descripcion
                })
                .OrderBy(d => d.NombreDepartamento)
                .ToList();
        }

        // Obtener por ID
        public async Task<DepartamentoDTO> GetByIdAsync(int id)
        {
            var departamento = await _repository.GetByIdAsync(id);

            if (departamento == null)
                throw new AppException($"Departamento con ID {id} no encontrado");

            return _mapper.Map<DepartamentoDTO>(departamento);
        }
    }
}