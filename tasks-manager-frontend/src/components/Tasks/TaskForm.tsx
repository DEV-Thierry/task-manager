import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Stack,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import type { Task, TaskDTO } from "../../models/Task";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskDTO) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TaskDTO>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          status: initialData.status,
          dueDate: initialData.dueDate.toISOString().split("T")[0],
        }
      : {
          title: "",
          description: "",
          status: "pending",
          dueDate: new Date().toISOString().split("T")[0],
        },
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel>Título</FormLabel>
          <Input
            {...register("title", {
              required: "Título é obrigatório",
              minLength: {
                value: 3,
                message: "Título deve ter pelo menos 3 caracteres",
              },
            })}
            placeholder="Digite o título da tarefa"
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            {...register("description")}
            placeholder="Digite a descrição da tarefa (opcional)"
            resize="vertical"
            rows={4}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.dueDate} isRequired>
          <FormLabel>Data de Vencimento</FormLabel>
          <Input
            {...register("dueDate", {
              required: "Data de vencimento é obrigatória",
            })}
            type="date"
          />
          <FormErrorMessage>{errors.dueDate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                isChecked={value === "completed"}
                onChange={(e) =>
                  onChange(e.target.checked ? "completed" : "pending")
                }
                colorScheme="green"
              >
                Marcar como concluída
              </Checkbox>
            )}
          />
        </FormControl>

        <Stack direction="row" spacing={4} justify="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
            {initialData ? "Atualizar" : "Criar Tarefa"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
