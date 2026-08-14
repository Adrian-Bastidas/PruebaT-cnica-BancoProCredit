using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;
using BancoProcredit.Domain.Interfaces;
using BancoProcredit.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace BancoProcredit.Infrastructure.Persistence.Repositories
{
    public class EmpleadoRepository : IEmpleadoRepository
    {
        private readonly BancoProcreditContext _context;

        public EmpleadoRepository(BancoProcreditContext context)
        {
            _context = context;
        }

        // LINQ: Obtener todos los empleados
        public async Task<IEnumerable<Empleado>> GetAllAsync()
        {
            return await _context.Empleados
                .Where(e => e.Activo)
                .Include(e => e.Departamento)
                .Include(e => e.Cargo)
                .OrderBy(e => e.Nombre)
                .ThenBy(e => e.Apellido)
                .ToListAsync();
        }

        // LINQ: Obtener empleado por ID
        public async Task<Empleado> GetByIdAsync(int id)
        {
            return await _context.Empleados
                .Where(e => e.Activo)
                .Where(e => e.EmpleadoID == id)
                .Include(e => e.Departamento)
                .Include(e => e.Cargo)
                .FirstOrDefaultAsync();
        }

        // LINQ: Obtener por número de documento
        public async Task<Empleado> GetByDocumentoAsync(string numeroDocumento)
        {
            return await _context.Empleados
                .Where(e => e.Activo)
                .Where(e => e.NumeroDocumento == numeroDocumento)
                .Include(e => e.Departamento)
                .Include(e => e.Cargo)
                .FirstOrDefaultAsync();
        }

        // LINQ: Obtener empleados por departamento
        public async Task<IEnumerable<Empleado>> GetByDepartamentoAsync(int departamentoId)
        {
            return await _context.Empleados
                .Where(e => e.Activo)
                .Where(e => e.DepartamentoID == departamentoId)
                .Include(e => e.Departamento)
                .Include(e => e.Cargo)
                .OrderBy(e => e.Nombre)
                .ThenBy(e => e.Apellido)
                .ToListAsync();
        }

        // LINQ: Crear empleado
        public async Task<int> CreateAsync(Empleado empleado)
        {
            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();
            return empleado.EmpleadoID;
        }

        // LINQ: Actualizar empleado
        public async Task<bool> UpdateAsync(Empleado empleado)
        {
            _context.Empleados.Update(empleado);
            await _context.SaveChangesAsync();
            return true;
        }

        // LINQ: Eliminar empleado (borrado lógico)
        public async Task<bool> DeleteAsync(int id)
        {
            var empleado = await _context.Empleados
                .FirstOrDefaultAsync(e => e.EmpleadoID == id);

            if (empleado == null)
                return false;

            empleado.Activo = false;
            _context.Empleados.Update(empleado);
            await _context.SaveChangesAsync();
            return true;
        }

        // LINQ: Verificar si documento existe
        public async Task<bool> DocumentoExisteAsync(string numeroDocumento)
        {
            return await _context.Empleados
                .AnyAsync(e => e.NumeroDocumento == numeroDocumento);
        }
        public async Task<(IEnumerable<Empleado> data, int total)> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var query = _context.Empleados
                .Where(e => e.Activo)
                .Include(e => e.Departamento)
                .Include(e => e.Cargo)
                .OrderBy(e => e.Nombre)
                .ThenBy(e => e.Apellido);

            var total = await query.CountAsync();

            var data = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, total);
        }

        // LINQ con paginación: Por departamento
        public async Task<(IEnumerable<Empleado> data, int total)> GetByDepartamentoPaginatedAsync(int departamentoId, int pageNumber, int pageSize)
        {
            var query = _context.Empleados
                .Where(e => e.Activo)
                .Where(e => e.DepartamentoID == departamentoId)
                .Include(e => e.Departamento)
                .Include(e => e.Cargo)
                .OrderBy(e => e.Nombre)
                .ThenBy(e => e.Apellido);

            var total = await query.CountAsync();

            var data = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, total);
        }
    }
}