
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoListForm from "@/components/TodoListForm";
import { useTodoLists } from "@/hooks/useTodoLists";
import { Task } from "@/types/todo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2, MoreHorizontal, Edit } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const Index = () => {
  const {
    todoLists,
    isLoading,
    createTodoList,
    deleteTodoList,
    addTask,
    updateTask,
    deleteTask,
    updateTodoList,
  } = useTodoLists();

  const [activeList, setActiveList] = useState<string | null>(null);
  const [editingList, setEditingList] = useState<{ id: string, name: string } | null>(null);

  // Set the first todo list as active if none is selected and lists are available
  if (!activeList && todoLists.length > 0 && !isLoading) {
    setActiveList(todoLists[0]._id);
  }

  const handleAddTask = (task: Task) => {
    if (activeList) {
      addTask({ todoListId: activeList, task });
    }
  };

  const handleToggleTask = (todoListId: string, taskId: string, task: Task) => {
    updateTask({ todoListId, taskId, task });
  };

  const handleUpdateTask = (todoListId: string, taskId: string, task: Task) => {
    updateTask({ todoListId, taskId, task });
  };
  
  const handleDeleteTask = (todoListId: string, taskId: string) => {
    deleteTask({ todoListId, taskId });
  };

  const handleAddTodoList = (name: string) => {
    createTodoList(name);
  };

  const handleDeleteTodoList = (id: string) => {
    deleteTodoList(id);
    if (activeList === id) {
      const remainingLists = todoLists.filter(list => list._id !== id);
      setActiveList(remainingLists.length > 0 ? remainingLists[0]._id : null);
    }
  };

  const handleUpdateTodoList = () => {
    if (editingList) {
      const listToUpdate = todoLists.find(list => list._id === editingList.id);
      if (listToUpdate) {
        updateTodoList({
          ...listToUpdate,
          name: editingList.name
        });
      }
      setEditingList(null);
    }
  };

  // Get the current active todo list
  const currentTodoList = todoLists.find(list => list._id === activeList);
  
  const activeTasks = currentTodoList?.tasks?.filter(task => !task.done) || [];
  const completedTasks = currentTodoList?.tasks?.filter(task => task.done) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-950 py-8 px-4 md:py-12">
        <div className="container max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
            <CardContent className="p-5 md:p-6 flex items-center justify-center min-h-[200px]">
              <p className="text-gray-500 dark:text-gray-400">Loading todo lists...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-950 py-8 px-4 md:py-12">
      <div className="container max-w-4xl mx-auto">
        <Card className="border-none shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md mb-6">
          <CardHeader className="pb-3 border-b border-purple-100 dark:border-purple-900">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              My Todo Lists
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 md:p-6">
            <TodoListForm onAddTodoList={handleAddTodoList} />
            
            {todoLists.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  You don't have any todo lists yet. Create one to get started!
                </p>
              </div>
            ) : (
              <Tabs
                value={activeList || undefined}
                onValueChange={(value) => setActiveList(value)}
                className="w-full"
              >
                <TabsList className="w-full h-auto flex flex-wrap justify-start overflow-x-auto pb-1 mb-4">
                  {todoLists.map((list) => (
                    <div key={list._id} className="flex items-center gap-1">
                      <TabsTrigger 
                        value={list._id || ''} 
                        className="px-4 py-2 relative flex-shrink-0"
                      >
                        {list.name}
                        <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {list.tasks.length}
                        </span>
                      </TabsTrigger>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingList({ id: list._id!, name: list.name })}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteTodoList(list._id!)} className="text-red-600 dark:text-red-400">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </TabsList>
                
                {todoLists.map((list) => (
                  <TabsContent key={list._id} value={list._id || ''} className="focus-visible:outline-none focus-visible:ring-0 focus:outline-none">
                    <Card className="border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <CardHeader className="pb-3 border-b border-purple-100 dark:border-purple-900">
                        <CardTitle className="text-xl font-bold text-purple-700 dark:text-purple-300">
                          {list.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 md:p-6">
                        <TodoForm onAddTask={handleAddTask} todoListId={list._id!} />
                        
                        {activeTasks.length > 0 && (
                          <div className="mb-8">
                            <h2 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center">
                              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                              Active Tasks ({activeTasks.length})
                            </h2>
                            <TodoList 
                              tasks={activeTasks} 
                              todoListId={list._id!}
                              onToggle={handleToggleTask} 
                              onRemove={handleDeleteTask} 
                              onUpdate={handleUpdateTask} 
                            />
                          </div>
                        )}
                        
                        {completedTasks.length > 0 && (
                          <div>
                            <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                              Completed Tasks ({completedTasks.length})
                            </h2>
                            <TodoList 
                              tasks={completedTasks} 
                              todoListId={list._id!}
                              onToggle={handleToggleTask} 
                              onRemove={handleDeleteTask} 
                              onUpdate={handleUpdateTask} 
                            />
                          </div>
                        )}

                        {list.tasks.length === 0 && (
                          <div className="text-center py-10">
                            <p className="text-gray-500 dark:text-gray-400">This todo list is empty. Add some tasks to get started!</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={!!editingList} onOpenChange={(open) => !open && setEditingList(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={editingList?.name || ''} 
              onChange={(e) => editingList && setEditingList({...editingList, name: e.target.value})}
              placeholder="Todo list name"
              className="focus-visible:ring-purple-400"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingList(null)}>Cancel</Button>
            <Button onClick={handleUpdateTodoList}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
