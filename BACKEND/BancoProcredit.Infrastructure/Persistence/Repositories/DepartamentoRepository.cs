using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;
using BancoProcredit.Domain.Interfaces;
using BancoProcredit.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace BancoProcredit.Infrastructure.Persistence.Repositories
{
    public class DepartamentoRepository : IDepartamentoRepository
    {
        private readonly BancoProcreditContext _context;

        public DepartamentoRepository(BancoProcreditContext context)
        {
            _context = context;
        }

        // LINQ: Obtener todos los departamentos
        public async Task<IEnumerable<Departamento>> GetAllAsync()
        {
            return await _context.Departamentos
                .Where(d => d.Activo)
                .OrderBy(d => d.NombreDepartamento)
                .ToListAsync();
        }

        // LINQ: Obtener departamento por ID
        public async Task<Departamento> GetByIdAsync(int id)
        {
            return await _context.Departamentos
                .Where(d => d.Activo)
                .FirstOrDefaultAsync(d => d.DepartamentoID == id);
        }

        // LINQ: Verificar si existe
        public async Task<bool> ExisteAsync(int id)
        {
            return await _context.Departamentos
                .AnyAsync(d => d.DepartamentoID == id && d.Activo);
        }
    }
}