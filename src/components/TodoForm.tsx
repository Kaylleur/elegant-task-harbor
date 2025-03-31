import { useState } from "react";
import { Input } from "@front/components/ui/input";
import { Button } from "@front/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { Task } from "@front/types/todo";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@front/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@front/components/ui/popover";
import { Calendar as CalendarComponent } from "@front/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@front/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@front/components/ui/collapsible";

interface TodoFormProps {
  onAddTask: (task: Task) => void;
  todoListId: string;
}

const TodoForm = ({ onAddTask, todoListId }: TodoFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask: Task = {
        title: title.trim(),
        description: description.trim() || undefined,
        done: false,
        createdAt: new Date().toISOString(),
        priority,
        dueDate: date ? date.toISOString() : undefined,
      };

      onAddTask(newTask);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDate(undefined);
      setIsOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-900 focus-visible:ring-purple-400"
        />
        <Button 
          type="submit" 
          disabled={!title.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20">
            {isOpen ? "Hide Details" : "Add More Details"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-3">
          <Textarea 
            placeholder="Description (optional)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-900 focus-visible:ring-purple-400"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/2">
              <Select value={priority} onValueChange={(val: "low" | "medium" | "high") => setPriority(val)}>
                <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-900 focus:ring-purple-400">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-900">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Set due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
};

export default TodoForm;
