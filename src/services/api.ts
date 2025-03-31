
import { Task, TodoList } from "@front/types/todo";
import { toast } from "@front/hooks/use-toast";

const API_URL = "http://localhost:3000/api";

// Error handling helper
const handleError = (error: any) => {
  console.error("API Error:", error);
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  });
  throw error;
};

export const todoListApi = {
  // Get all todo lists
  getAllTodoLists: async (): Promise<TodoList[]> => {
    try {
      const response = await fetch(`${API_URL}/todolists`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  // Get a specific todo list
  getTodoList: async (id: string): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_URL}/todolists/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  // Create a new todo list
  createTodoList: async (name: string): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_URL}/todolists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tasks: [] }),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  // Update a todo list
  updateTodoList: async (todoList: TodoList): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_URL}/todolists/${todoList._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoList),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete a todo list
  deleteTodoList: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/todolists/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
      handleError(error);
    }
  },

  // Add a task to a todo list
  addTask: async (todoListId: string, task: Task): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_URL}/todolists/${todoListId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  // Update a task in a todo list
  updateTask: async (todoListId: string, taskId: string, task: Task): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_URL}/todolists/${todoListId}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  // Delete a task from a todo list
  deleteTask: async (todoListId: string, taskId: string): Promise<TodoList> => {
    try {
      const response = await fetch(`${API_URL}/todolists/${todoListId}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },
};
