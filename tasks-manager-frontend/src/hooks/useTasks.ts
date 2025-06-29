import { useState, useEffect, useCallback } from "react";
import type { Task, TaskDTO, TaskFilterStrategy } from "../models/Task";
import TaskService from "../services/taskService";
import { AllTasksFilterStrategy } from "../strategies/TaskFilterStrategies";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStrategy, setFilterStrategy] = useState<TaskFilterStrategy>(
    new AllTasksFilterStrategy(),
  );

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await TaskService.getAll();
      setTasks(fetchedTasks);
      applyFilter(fetchedTasks);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilter = useCallback(
    (tasksToFilter: Task[]) => {
      const filtered = filterStrategy.filter(tasksToFilter);
      setFilteredTasks(filtered);
    },
    [filterStrategy],
  );

  const changeFilterStrategy = useCallback(
    (newStrategy: TaskFilterStrategy) => {
      setFilterStrategy(newStrategy);
      applyFilter(tasks);
    },
    [tasks, applyFilter],
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    applyFilter(tasks);
  }, [tasks, applyFilter]);

  const createTask = useCallback(async (taskDto: TaskDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await TaskService.create(taskDto);
      if (newTask) {
        setTasks((prev) => [...prev, newTask]);
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(
    async (id: string, taskDto: TaskDTO): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const updatedTask = await TaskService.update(id, taskDto);
        if (updatedTask) {
          setTasks((prev) =>
            prev.map((task) => (task.id === id ? updatedTask : task)),
          );
          return true;
        }
        return false;
      } catch (err) {
        setError(`Failed to update task with ID: ${id}`);
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const toggleTaskStatus = useCallback(
    async (task: Task): Promise<boolean> => {
      const newStatus = task.status === "pending" ? "completed" : "pending";
      const taskDto: TaskDTO = {
        title: task.title,
        description: task.description,
        status: newStatus,
        dueDate: task.dueDate.toISOString().split("T")[0],
      };
      return updateTask(task.id, taskDto);
    },
    [updateTask],
  );

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const success = await TaskService.delete(id);
      if (success) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError(`Failed to delete task with ID: ${id}`);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks: filteredTasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    changeFilterStrategy,
  };
};
