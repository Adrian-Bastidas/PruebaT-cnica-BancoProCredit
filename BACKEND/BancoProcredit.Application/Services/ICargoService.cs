using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.DTOs;

namespace BancoProcredit.Application.Services
{
    public interface ICargoService
    {
        Task<IEnumerable<CargoDTO>> GetAllAsync();
        Task<CargoDTO> GetByIdAsync(int id);
    }
}