export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskDTO {
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string; // ISO date string para API
}

export interface TaskFilterStrategy {
  filter(tasks: Task[]): Task[];
}
