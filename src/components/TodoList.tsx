
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const TodoList = ({ todos, onToggle, onRemove, onUpdate }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        <p>No tasks in this section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              todo={todo}
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
