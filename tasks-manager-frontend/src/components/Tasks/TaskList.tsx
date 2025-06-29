import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import type { Task } from "../../models/Task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleStatus: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Carregando tarefas...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Nenhuma tarefa encontrada. Crie uma para começar!</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="md" mb={4}>
        Suas Tarefas ({tasks.length})
      </Heading>
      <VStack spacing={4} align="stretch">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </VStack>
    </Box>
  );
};
