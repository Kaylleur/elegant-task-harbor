
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  done: boolean;
  dueDate?: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TodoList {
  _id?: string;
  name: string;
  createdAt: string;
  tasks: Task[];
}
