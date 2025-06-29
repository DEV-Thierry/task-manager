/* eslint-disable  @typescript-eslint/no-explicit-any */
import api from "./api";
import type { Task, TaskDTO } from "../models/Task";

class TaskService {
  private readonly baseUrl = "/tasks";

  async getAll(): Promise<Task[]> {
    try {
      const response = await api.get(this.baseUrl);
      return response.data.map(this.mapDateFields);
    } catch (error) {
      this.handleError(error, "Failed to fetch tasks");
      return [];
    }
  }

  async getById(id: string): Promise<Task | null> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return this.mapDateFields(response.data);
    } catch (error) {
      this.handleError(error, `Failed to fetch task with id ${id}`);
      return null;
    }
  }

  async create(taskDto: TaskDTO): Promise<Task | null> {
    try {
      const response = await api.post(this.baseUrl, taskDto);
      return this.mapDateFields(response.data);
    } catch (error) {
      this.handleError(error, "Failed to create task");
      return null;
    }
  }

  async update(id: string, taskDto: TaskDTO): Promise<Task | null> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, taskDto);
      return this.mapDateFields(response.data);
    } catch (error) {
      this.handleError(error, `Failed to update task with id ${id}`);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
      return true;
    } catch (error) {
      this.handleError(error, `Failed to delete task with id ${id}`);
      return false;
    }
  }

  private mapDateFields(task: any): Task {
    return {
      ...task,
      dueDate: new Date(task.dueDate),
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    };
  }

  private handleError(error: any, message: string): void {
    console.error(message, error);
    // Implementar tratamento de erro mais robusto conforme necessário
  }
}

export default new TaskService();
