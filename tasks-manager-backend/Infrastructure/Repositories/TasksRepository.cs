using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class TasksRepository : ITasksRepository
    {
        private readonly ApplicationDbContext _context;

        public TasksRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tasks>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<Tasks> GetByIdAsync(Guid id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<IEnumerable<Tasks>> GetByStatusAsync(string status)
        {
            return await _context.Tasks.Where(t => t.Status == status).ToListAsync();
        }

        public async Task<IEnumerable<Tasks>> GetDueTodayAsync()
        {
            var today = DateTime.UtcNow.Date;
            var tomorrow = today.AddDays(1);

            return await _context.Tasks
                .Where(t => t.DueDate >= today && t.DueDate < tomorrow)
                .ToListAsync();
        }

        public async Task AddAsync(Tasks task)
        {
            await _context.Tasks.AddAsync(task);
        }

        public Task UpdateAsync(Tasks task)
        {
            _context.Entry(task).State = EntityState.Modified;
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(Guid id)
        {
            var task = await GetByIdAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
            }
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Tasks.AnyAsync(t => t.Id == id);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
