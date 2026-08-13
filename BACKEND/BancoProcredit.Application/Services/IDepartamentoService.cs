using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.DTOs;

namespace BancoProcredit.Application.Services
{
    public interface IDepartamentoService
    {
        Task<IEnumerable<DepartamentoDTO>> GetAllAsync();
        Task<DepartamentoDTO> GetByIdAsync(int id);
    }
}