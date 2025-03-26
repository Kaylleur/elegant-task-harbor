
import { useState } from "react";
import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const TodoItem = ({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg transition-all gap-3 group",
      todo.completed 
        ? "bg-green-50/80 dark:bg-green-900/20 border border-green-100 dark:border-green-900 hover:shadow-md" 
        : "bg-white/80 dark:bg-gray-800/80 border border-purple-100 dark:border-purple-900 hover:shadow-md"
    )}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className={cn(
            "h-5 w-5 transition-colors",
            todo.completed 
              ? "border-green-500 data-[state=checked]:bg-green-500" 
              : "border-purple-400 data-[state=checked]:bg-purple-500"
          )}
        />
        
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-700"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
              if (e.key === "Escape") handleCancel();
            }}
          />
        ) : (
          <span
            className={cn(
              "flex-1 text-sm truncate transition-all",
              todo.completed 
                ? "line-through text-green-700 dark:text-green-400" 
                : "text-gray-800 dark:text-gray-200"
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="flex gap-1">
          <Button 
            size="icon" 
            variant="ghost"
            onClick={handleUpdate}
            className="text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleCancel}
            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(todo.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
