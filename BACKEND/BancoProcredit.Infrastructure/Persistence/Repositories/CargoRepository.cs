using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;
using BancoProcredit.Domain.Interfaces;
using BancoProcredit.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace BancoProcredit.Infrastructure.Persistence.Repositories
{
    public class CargoRepository : ICargoRepository
    {
        private readonly BancoProcreditContext _context;

        public CargoRepository(BancoProcreditContext context)
        {
            _context = context;
        }

        // LINQ: Obtener todos los cargos
        public async Task<IEnumerable<Cargo>> GetAllAsync()
        {
            return await _context.Cargos
                .Where(c => c.Activo)
                .OrderBy(c => c.NombreCargo)
                .ToListAsync();
        }

        // LINQ: Obtener cargo por ID
        public async Task<Cargo> GetByIdAsync(int id)
        {
            return await _context.Cargos
                .Where(c => c.Activo)
                .FirstOrDefaultAsync(c => c.CargoID == id);
        }

        // LINQ: Verificar si existe
        public async Task<bool> ExisteAsync(int id)
        {
            return await _context.Cargos
                .AnyAsync(c => c.CargoID == id && c.Activo);
        }
    }
}