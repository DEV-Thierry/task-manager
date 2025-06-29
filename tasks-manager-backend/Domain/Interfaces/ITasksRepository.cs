using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces;

public interface ITasksRepository
{
    Task<IEnumerable<Tasks>> GetAllAsync();
    Task<Entities.Tasks> GetByIdAsync(Guid id);
    Task<IEnumerable<Tasks>> GetByStatusAsync(string status);
    Task<IEnumerable<Tasks>> GetDueTodayAsync();
    Task AddAsync(Tasks task);
    Task UpdateAsync(Tasks task);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
    Task<int> SaveChangesAsync();
}
