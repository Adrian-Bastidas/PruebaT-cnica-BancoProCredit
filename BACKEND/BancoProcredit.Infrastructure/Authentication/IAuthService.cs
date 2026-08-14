using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.DTOs;

namespace BancoProcredit.Infrastructure.Authentication
{
    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request);
        string GenerateToken(int userId, string email);
    }
}