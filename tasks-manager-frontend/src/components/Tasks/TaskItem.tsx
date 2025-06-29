import {
  Box,
  Checkbox,
  Flex,
  Text,
  IconButton,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import type { Task } from "../../models/Task";
import { formatDate } from "../../utils/dateUtils";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      p={4}
      mb={3}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={bgColor}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Checkbox
            isChecked={task.status === "completed"}
            onChange={() => onToggleStatus(task)}
            mr={4}
            colorScheme="green"
          />
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              textDecoration={
                task.status === "completed" ? "line-through" : "none"
              }
              color={task.status === "completed" ? "gray.500" : "inherit"}
            >
              {task.title}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={2}>
              {task.description}
            </Text>
            <Flex mt={2} align="center">
              <Badge
                colorScheme={task.status === "completed" ? "green" : "orange"}
              >
                {task.status === "completed" ? "Concluída" : "Pendente"}
              </Badge>
              <Text fontSize="xs" ml={2} color="gray.500">
                Vencimento: {formatDate(task.dueDate)}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Flex>
          <IconButton
            icon={<EditIcon />}
            aria-label="Editar tarefa"
            size="sm"
            colorScheme="blue"
            variant="ghost"
            mr={2}
            onClick={() => onEdit(task)}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Excluir tarefa"
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => onDelete(task.id)}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
