using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Exceptions;

namespace BancoProcredit.Infrastructure.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly JwtTokenProvider _jwtTokenProvider;

        // Usuario de prueba preconfigurado
        private const string TEST_USERNAME = "usuario";
        private const string TEST_PASSWORD = "123456";
        private const int TEST_USER_ID = 1;

        public AuthService(JwtTokenProvider jwtTokenProvider)
        {
            _jwtTokenProvider = jwtTokenProvider;
        }

        public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request)
        {
            // Validar datos de entrada
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return new LoginResponseDTO
                {
                    Success = false,
                    Message = "Usuario y contraseña son requeridos",
                    Token = null,
                    ExpiresAt = DateTime.MinValue
                };
            }

            // Validar credenciales (en producción usar BD)
            if (request.Username != TEST_USERNAME || request.Password != TEST_PASSWORD)
            {
                return new LoginResponseDTO
                {
                    Success = false,
                    Message = "Usuario o contraseña incorrectos",
                    Token = null,
                    ExpiresAt = DateTime.MinValue
                };
            }

            // Generar token
            var token = GenerateToken(TEST_USER_ID, request.Username);
            var expiresAt = DateTime.UtcNow.AddHours(1); // Token válido por 1 hora

            return new LoginResponseDTO
            {
                Success = true,
                Message = "Login exitoso",
                Token = token,
                ExpiresAt = expiresAt
            };
        }

        public string GenerateToken(int userId, string username)
        {
            return _jwtTokenProvider.GenerateToken(userId, username);
        }
    }
}