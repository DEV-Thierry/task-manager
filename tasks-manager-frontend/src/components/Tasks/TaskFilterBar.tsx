import { useState } from "react";
import { ButtonGroup, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  AllTasksFilterStrategy,
  PendingTasksFilterStrategy,
  CompletedTasksFilterStrategy,
  DueTodayTasksFilterStrategy,
} from "../../strategies/TaskFilterStrategies";
import type { TaskFilterStrategy } from "../../models/Task";

interface TaskFilterBarProps {
  onFilterChange: (strategy: TaskFilterStrategy) => void;
}

export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  onFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const bgColor = useColorModeValue("white", "gray.700");

  const handleFilterChange = (
    filterName: string,
    strategy: TaskFilterStrategy,
  ) => {
    setActiveFilter(filterName);
    onFilterChange(strategy);
  };

  return (
    <Flex
      p={3}
      bg={bgColor}
      borderRadius="md"
      boxShadow="sm"
      mb={4}
      overflowX="auto"
    >
      <ButtonGroup variant="outline" size="sm" spacing={3} isAttached={false}>
        <Button
          colorScheme={activeFilter === "all" ? "blue" : "gray"}
          variant={activeFilter === "all" ? "solid" : "outline"}
          onClick={() =>
            handleFilterChange("all", new AllTasksFilterStrategy())
          }
        >
          Todas
        </Button>
        <Button
          colorScheme={activeFilter === "pending" ? "orange" : "gray"}
          variant={activeFilter === "pending" ? "solid" : "outline"}
          onClick={() =>
            handleFilterChange("pending", new PendingTasksFilterStrategy())
          }
        >
          Pendentes
        </Button>
        <Button
          colorScheme={activeFilter === "completed" ? "green" : "gray"}
          variant={activeFilter === "completed" ? "solid" : "outline"}
          onClick={() =>
            handleFilterChange("completed", new CompletedTasksFilterStrategy())
          }
        >
          Concluídas
        </Button>
        <Button
          colorScheme={activeFilter === "dueToday" ? "purple" : "gray"}
          variant={activeFilter === "dueToday" ? "solid" : "outline"}
          onClick={() =>
            handleFilterChange("dueToday", new DueTodayTasksFilterStrategy())
          }
        >
          Para Hoje
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
