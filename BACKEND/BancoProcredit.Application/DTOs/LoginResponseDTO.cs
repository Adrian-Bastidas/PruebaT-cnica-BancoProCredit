using System;
using System.Collections.Generic;
using System.Text;

namespace BancoProcredit.Application.DTOs
{
    public class LoginResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}