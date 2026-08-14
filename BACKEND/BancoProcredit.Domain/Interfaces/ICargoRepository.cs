using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;

namespace BancoProcredit.Domain.Interfaces
{
    public interface ICargoRepository
    {
        Task<IEnumerable<Cargo>> GetAllAsync();
        Task<Cargo> GetByIdAsync(int id);
        Task<bool> ExisteAsync(int id);
    }
}