import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "@front/services/api";
import { Task, TodoList } from "@front/types/todo";
import { toast } from "@front/hooks/use-toast";

export const useTodoLists = () => {
  const queryClient = useQueryClient();

  // Fetch all todo lists
  const { data: todoLists = [], isLoading, error } = useQuery({
    queryKey: ["todoLists"],
    queryFn: todoListApi.getAllTodoLists,
  });

  // Create a new todo list
  const createTodoListMutation = useMutation({
    mutationFn: todoListApi.createTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Success",
        description: "Todo list created successfully",
      });
    },
  });

  // Delete a todo list
  const deleteTodoListMutation = useMutation({
    mutationFn: todoListApi.deleteTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Success",
        description: "Todo list deleted successfully",
      });
    },
  });

  // Add a task to a todo list
  const addTaskMutation = useMutation({
    mutationFn: ({ todoListId, task }: { todoListId: string; task: Task }) => 
      todoListApi.addTask(todoListId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Success",
        description: "Task added successfully",
      });
    },
  });

  // Update a task in a todo list
  const updateTaskMutation = useMutation({
    mutationFn: ({ todoListId, taskId, task }: { todoListId: string; taskId: string; task: Task }) => 
      todoListApi.updateTask(todoListId, taskId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    },
  });

  // Delete a task from a todo list
  const deleteTaskMutation = useMutation({
    mutationFn: ({ todoListId, taskId }: { todoListId: string; taskId: string }) => 
      todoListApi.deleteTask(todoListId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    },
  });

  // Update a todo list
  const updateTodoListMutation = useMutation({
    mutationFn: todoListApi.updateTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Success",
        description: "Todo list updated successfully",
      });
    },
  });

  return {
    todoLists,
    isLoading,
    error,
    createTodoList: createTodoListMutation.mutate,
    deleteTodoList: deleteTodoListMutation.mutate,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    updateTodoList: updateTodoListMutation.mutate,
  };
};
