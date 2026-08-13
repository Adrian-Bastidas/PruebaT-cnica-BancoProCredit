using System;
using System.Collections.Generic;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BancoProcredit.Infrastructure.Authentication
{
    public class JwtTokenProvider
    {
        private readonly string _jwtSecret;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;
        private readonly int _jwtExpireMinutes;

        public JwtTokenProvider(string jwtSecret, string jwtIssuer, string jwtAudience, int jwtExpireMinutes)
        {
            _jwtSecret = jwtSecret;
            _jwtIssuer = jwtIssuer;
            _jwtAudience = jwtAudience;
            _jwtExpireMinutes = jwtExpireMinutes;
        }

        public string GenerateToken(int userId, string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, username),
                new Claim("userid", userId.ToString()),
                new Claim("username", username)
            };

            var token = new JwtSecurityToken(
                issuer: _jwtIssuer,
                audience: _jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtExpireMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}