using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;

namespace BancoProcredit.Domain.Interfaces
{
    public interface IEmpleadoRepository
    {
        Task<IEnumerable<Empleado>> GetAllAsync();
        Task<Empleado> GetByIdAsync(int id);
        Task<Empleado> GetByDocumentoAsync(string numeroDocumento);
        Task<IEnumerable<Empleado>> GetByDepartamentoAsync(int departamentoId);
        Task<int> CreateAsync(Empleado empleado);
        Task<bool> UpdateAsync(Empleado empleado);
        Task<bool> DeleteAsync(int id);
        Task<bool> DocumentoExisteAsync(string numeroDocumento);
        Task<(IEnumerable<Empleado> data, int total)> GetAllPaginatedAsync(int pageNumber, int pageSize);
        Task<(IEnumerable<Empleado> data, int total)> GetByDepartamentoPaginatedAsync(int departamentoId, int pageNumber, int pageSize);
    }
}