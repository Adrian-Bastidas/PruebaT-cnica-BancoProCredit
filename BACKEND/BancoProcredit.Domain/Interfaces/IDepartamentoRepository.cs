using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;

namespace BancoProcredit.Domain.Interfaces
{
    public interface IDepartamentoRepository
    {
        Task<IEnumerable<Departamento>> GetAllAsync();
        Task<Departamento> GetByIdAsync(int id);
        Task<bool> ExisteAsync(int id);
    }
}