using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using System.Threading.Tasks;
using BCrypt.Net;

public class RegisterUserCommand
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginUserCommand
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class AuthResponse
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
    public IList<string> Roles { get; set; }
}

namespace Application.Commands
{
    public class AuthCommands
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthCommands(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<bool> RegisterAsync(RegisterUserCommand command)
        {
            var existingUser = await _userRepository.GetByUsernameAsync(command.Username);
            if (existingUser != null)
            {
                return false;
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);

            var user = new Usuario
            {
                FirstName = command.FirstName,
                LastName = command.LastName,
                Username = command.Username,
                Email = command.Email,
                PasswordHash = passwordHash,
            };

            await _userRepository.AddAsync(user);
            return true;
        }

        public async Task<AuthResponse> LoginAsync(LoginUserCommand command)
        {
            var user = await _userRepository.GetByUsernameAsync(command.Username);
            if (user == null)
            {
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(command.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                return null;
            }

            var token = await GenerateJwtToken(user);

            return new AuthResponse
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Token = token,
                Roles = user.UserRoles?
                    .Where(ur => ur.Role != null)
                    .Select(ur => ur.Role.Nome)
                    .ToList() ?? new List<string>()
            };
        }

        private async Task<string> GenerateJwtToken(Usuario user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UsuarioId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.UsuarioId.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            if (user.UserRoles != null)
            {

                foreach (var role in user.UserRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.Role.Nome));
                }
            }


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddHours(Convert.ToDouble(_configuration["Jwt:ExpiresHours"] ?? "2"));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

