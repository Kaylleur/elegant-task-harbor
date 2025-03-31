
import { Task } from "@/types/todo";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

interface TodoListProps {
  tasks: Task[];
  todoListId: string;
  onToggle: (todoListId: string, taskId: string, task: Task) => void;
  onRemove: (todoListId: string, taskId: string) => void;
  onUpdate: (todoListId: string, taskId: string, task: Task) => void;
}

const TodoList = ({ tasks, todoListId, onToggle, onRemove, onUpdate }: TodoListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        <p>No tasks in this section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              task={task}
              todoListId={todoListId}
              onToggle={onToggle}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
