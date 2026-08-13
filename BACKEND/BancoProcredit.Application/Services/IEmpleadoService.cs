using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.DTOs;

namespace BancoProcredit.Application.Services
{
    public interface IEmpleadoService
    {
        Task<IEnumerable<EmpleadoDTO>> GetAllAsync();
        Task<EmpleadoDTO> GetByIdAsync(int id);
        Task<IEnumerable<EmpleadoDTO>> GetByDepartamentoAsync(int departamentoId);
        Task<EmpleadoDTO> CreateAsync(CreateEmpleadoDTO dto);
        Task<bool> UpdateAsync(int id, CreateEmpleadoDTO dto);
        Task<bool> DeleteAsync(int id);
        Task<bool> DocumentoExisteAsync(string numeroDocumento);
    }
}