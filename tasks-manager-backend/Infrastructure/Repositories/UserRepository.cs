using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Usuario> GetByUsernameAsync(string username)
    {
        return await _context.Usuarios
                             .Include(u => u.UserRoles)
                             .ThenInclude(ur => ur.Role)
                             .FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task AddAsync(Usuario user)
    {
        await _context.Usuarios.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}
