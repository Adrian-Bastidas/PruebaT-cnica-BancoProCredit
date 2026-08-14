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
        private const string TEST_EMAIL = "admin@admin.com";
        private const string TEST_NAME = "admin";
        private const string TEST_PASSWORD = "Flerovio";
        private const int TEST_USER_ID = 1;

        public AuthService(JwtTokenProvider jwtTokenProvider)
        {
            _jwtTokenProvider = jwtTokenProvider;
        }

        public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request)
        {
            // Validar datos de entrada
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return new LoginResponseDTO
                {
                    Success = false,
                    Message = "Usuario y contraseña son requeridos",
                    Token = null,
                    user = null,
                    ExpiresAt = DateTime.MinValue
                };
            }

            // Validar credenciales (en producción usar BD)
            if (request.Email != TEST_EMAIL || request.Password != TEST_PASSWORD)
            {
                return new LoginResponseDTO
                {
                    Success = false,
                    Message = "Usuario o contraseña incorrectos",
                    Token = null,
                    user = null,
                    ExpiresAt = DateTime.MinValue
                };
            }

            // Generar token
            var token = GenerateToken(TEST_USER_ID, request.Email);
            var expiresAt = DateTime.UtcNow.AddHours(1); // Token válido por 1 hora
            var userSend = new UserDTO
            {
                email = TEST_EMAIL,
                name = TEST_NAME
            };

            return new LoginResponseDTO
            {
                Success = true,
                Message = "Login exitoso",
                Token = token,
                user = userSend,
                ExpiresAt = expiresAt
            };
        }

        public string GenerateToken(int userId, string email)
        {
            return _jwtTokenProvider.GenerateToken(userId, email);
        }
    }
}