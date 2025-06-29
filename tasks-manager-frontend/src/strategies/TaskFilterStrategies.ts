import type { Task, TaskFilterStrategy } from "../models/Task";

export class AllTasksFilterStrategy implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks;
  }
}

export class PendingTasksFilterStrategy implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.status === "pending");
  }
}

export class CompletedTasksFilterStrategy implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.status === "completed");
  }
}

export class DueTodayTasksFilterStrategy implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate >= today && dueDate < tomorrow;
    });
  }
}
