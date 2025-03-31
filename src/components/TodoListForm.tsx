
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TodoListFormProps {
  onAddTodoList: (name: string) => void;
}

const TodoListForm = ({ onAddTodoList }: TodoListFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddTodoList(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Create a new todo list..."
        className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-blue-200 dark:border-blue-900 focus-visible:ring-blue-400"
      />
      <Button 
        type="submit" 
        disabled={!name.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create List
      </Button>
    </form>
  );
};

export default TodoListForm;
