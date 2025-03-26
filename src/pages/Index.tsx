
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

const Index = () => {
  const { todos, addTodo, toggleTodo, removeTodo, updateTodo } = useTodos();
  
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-950 py-8 px-4 md:py-12">
      <div className="container max-w-2xl mx-auto">
        <Card className="border-none shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
          <CardHeader className="pb-3 border-b border-purple-100 dark:border-purple-900">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              My Task List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 md:p-6">
            <TodoForm onAddTodo={addTodo} />
            
            {activeTodos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  Active Tasks ({activeTodos.length})
                </h2>
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
                <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Completed Tasks ({completedTodos.length})
                </h2>
                <TodoList 
                  todos={completedTodos} 
                  onToggle={toggleTodo} 
                  onRemove={removeTodo} 
                  onUpdate={updateTodo} 
                />
              </div>
            )}

            {todos.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">Your todo list is empty. Add some tasks to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
