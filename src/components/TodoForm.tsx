
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-900 focus-visible:ring-purple-400"
      />
      <Button 
        type="submit" 
        disabled={!text.trim()}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
};

export default TodoForm;
