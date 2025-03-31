import { useState } from "react";
import { Task } from "@front/types/todo";
import { Checkbox } from "@front/components/ui/checkbox";
import { Button } from "@front/components/ui/button";
import { Input } from "@front/components/ui/input";
import { 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle
} from "lucide-react";
import { cn } from "@front/lib/utils";
import { format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@front/components/ui/collapsible";
import { Badge } from "@front/components/ui/badge";

interface TodoItemProps {
  task: Task;
  todoListId: string;
  onToggle: (todoListId: string, taskId: string, task: Task) => void;
  onRemove: (todoListId: string, taskId: string) => void;
  onUpdate: (todoListId: string, taskId: string, task: Task) => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const TodoItem = ({ task, todoListId, onToggle, onRemove, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onUpdate(todoListId, task._id!, { ...task, title: editTitle });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleToggle = () => {
    onToggle(todoListId, task._id!, { ...task, done: !task.done });
  };

  return (
    <div className={cn(
      "flex flex-col rounded-lg transition-all",
      task.done 
        ? "bg-green-50/80 dark:bg-green-900/20 border border-green-100 dark:border-green-900 hover:shadow-md" 
        : "bg-white/80 dark:bg-gray-800/80 border border-purple-100 dark:border-purple-900 hover:shadow-md"
    )}>
      <div className="flex items-center justify-between p-4 gap-3 group">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Checkbox
            checked={task.done}
            onCheckedChange={handleToggle}
            className={cn(
              "h-5 w-5 transition-colors",
              task.done 
                ? "border-green-500 data-[state=checked]:bg-green-500" 
                : "border-purple-400 data-[state=checked]:bg-purple-500"
            )}
          />
          
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 bg-white dark:bg-gray-700"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate();
                if (e.key === "Escape") handleCancel();
              }}
            />
          ) : (
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "block text-sm truncate transition-all",
                  task.done 
                    ? "line-through text-green-700 dark:text-green-400" 
                    : "text-gray-800 dark:text-gray-200"
                )}
              >
                {task.title}
              </span>
              <div className="flex items-center mt-1 gap-2">
                <Badge variant="outline" className={cn("text-xs", priorityColors[task.priority])}>
                  {task.priority}
                </Badge>
                
                {task.dueDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(task.dueDate), "MMM d")}
                  </span>
                )}
              </div>
            </div>
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
              onClick={() => onRemove(todoListId, task._id!)}
              className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <CollapsibleTrigger asChild onClick={() => setIsExpanded(!isExpanded)}>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/30"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        )}
      </div>

      <Collapsible open={isExpanded} className="w-full">
        <CollapsibleContent className="px-4 pb-4 pt-0">
          {task.description ? (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 italic mb-2">No description</p>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Created: {format(new Date(task.createdAt), "PPP")}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TodoItem;
