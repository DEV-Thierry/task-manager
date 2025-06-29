import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import type { Task, TaskDTO } from "../../models/Task";
import { TaskForm } from "./TaskForm";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onSubmit: (data: TaskDTO) => void;
  isSubmitting: boolean;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task ? "Editar Tarefa" : "Nova Tarefa"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TaskForm
            initialData={task}
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
