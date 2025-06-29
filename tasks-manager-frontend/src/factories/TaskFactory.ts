import type { TaskDTO } from "../models/Task";

export class TaskFactory {
  static createNewTaskDTO(
    title: string = "",
    description: string = "",
    dueDate: Date = new Date(),
  ): TaskDTO {
    return {
      title,
      description,
      status: "pending",
      dueDate: dueDate.toISOString().split("T")[0],
    };
  }
}
