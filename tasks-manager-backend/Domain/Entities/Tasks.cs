namespace Domain.Entities;

public class Tasks
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; } // "pending" ou "completed"
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public Tasks()
    {
        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        Status = "pending";
    }

    public void ToggleStatus()
    {
        Status = Status == "pending" ? "completed" : "pending";
        UpdatedAt = DateTime.UtcNow;
    }

    public void Update(string title, string description, DateTime dueDate, string status)
    {
        Title = title;
        Description = description;
        DueDate = dueDate;
        Status = status;
        UpdatedAt = DateTime.UtcNow;
    }
}
