import { useState, useCallback } from "react";
import {
  Box,
  Button,
  useDisclosure,
  useToast,
  Heading,
  Flex,
  useColorModeValue,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/Tasks/TaskList";
import { TaskModal } from "../components/Tasks/TaskModal";
import { TaskFilterBar } from "../components/Tasks/TaskFilterBar";
import type { Task, TaskDTO, TaskFilterStrategy } from "../models/Task";
import { useColorMode } from "@chakra-ui/react";

const TaskPage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    changeFilterStrategy,
  } = useTasks();

  const handleOpenModal = useCallback(
    (task?: Task) => {
      setSelectedTask(task);
      onOpen();
    },
    [onOpen],
  );

  const handleSubmit = useCallback(
    async (taskDto: TaskDTO) => {
      setIsSubmitting(true);
      try {
        let success;
        if (selectedTask) {
          // Update existing task
          success = await updateTask(selectedTask.id, taskDto);
          if (success) {
            toast({
              title: "Tarefa atualizada",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        } else {
          // Create new task
          success = await createTask(taskDto);
          if (success) {
            toast({
              title: "Tarefa criada",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        }

        if (success) {
          onClose();
        } else {
          toast({
            title: "Operação falhou",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedTask, updateTask, createTask, toast, onClose],
  );

  const handleToggleStatus = useCallback(
    async (task: Task) => {
      const success = await toggleTaskStatus(task);
      if (success) {
        toast({
          title: `Tarefa marcada como ${task.status === "pending" ? "concluída" : "pendente"}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Falha ao atualizar status da tarefa",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [toggleTaskStatus, toast],
  );

  const handleDelete = useCallback(
    async (taskId: string) => {
      const success = await deleteTask(taskId);
      if (success) {
        toast({
          title: "Tarefa excluída",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Falha ao excluir tarefa",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [deleteTask, toast],
  );

  const handleFilterChange = useCallback(
    (strategy: TaskFilterStrategy) => {
      changeFilterStrategy(strategy);
    },
    [changeFilterStrategy],
  );

  return (
    <Container maxW="container.lg" py={8}>
      <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="xl">Gerenciador de Tarefas</Heading>
          <Flex>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label={`Alternar para modo ${colorMode === "light" ? "escuro" : "claro"}`}
              variant="ghost"
              mr={3}
            />
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => handleOpenModal()}
            >
              Nova Tarefa
            </Button>
          </Flex>
        </Flex>

        <TaskFilterBar onFilterChange={handleFilterChange} />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggleStatus={handleToggleStatus}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />

        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          task={selectedTask}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Box>
    </Container>
  );
};

export default TaskPage;
