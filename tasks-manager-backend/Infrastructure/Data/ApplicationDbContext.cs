
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Tasks> Tasks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>()
              .HasKey(ur => ur.UserRoleId);

            modelBuilder.Entity<UserRole>()
              .HasOne(ur => ur.User)
              .WithMany(u => u.UserRoles)
              .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
              .HasOne(ur => ur.Role)
              .WithMany(r => r.UserRoles)
              .HasForeignKey(ur => ur.RoleId);
        }

    }
}
