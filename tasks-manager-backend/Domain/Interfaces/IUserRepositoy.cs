
using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces;

public interface IUserRepository
{
    Task<Usuario> GetByUsernameAsync(string username);
    Task AddAsync(Usuario user);
}
