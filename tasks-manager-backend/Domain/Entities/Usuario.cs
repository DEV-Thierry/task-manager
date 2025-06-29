namespace Domain.Entities;

public class Usuario
{
    public long UsuarioId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    public ICollection<UserRole> UserRoles { get; set; }

}

public class Role
{
    public long RoleId { get; set; }
    public string Nome { get; set; }
    public ICollection<UserRole> UserRoles { get; set; }
}

public class UserRole
{
    public long UserRoleId { get; set; }
    public long UserId { get; set; }
    public Usuario User { get; set; }
    public long RoleId { get; set; }
    public Role Role { get; set; }
}
