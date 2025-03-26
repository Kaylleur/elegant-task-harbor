
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

const Index = () => {
  const { todos, addTodo, toggleTodo, removeTodo, updateTodo } = useTodos();
  
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-center">
              My Todo List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TodoForm onAddTodo={addTodo} />
            
            {activeTodos.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-500 mb-3">Active Tasks</h2>
                <TodoList 
                  todos={activeTodos} 
                  onToggle={toggleTodo} 
                  onRemove={removeTodo} 
                  onUpdate={updateTodo} 
                />
              </div>
            )}
            
            {completedTodos.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-3">Completed Tasks</h2>
                <TodoList 
                  todos={completedTodos} 
                  onToggle={toggleTodo} 
                  onRemove={removeTodo} 
                  onUpdate={updateTodo} 
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
