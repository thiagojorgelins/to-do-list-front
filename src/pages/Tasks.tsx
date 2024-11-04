import { Header } from '../components/Header';
import { TaskList } from '../components/TaskList';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { useState, useCallback } from 'react';

export function Tasks() {
  const [isCreating, setIsCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = useCallback(() => {
    setIsCreating(false);
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Minhas Tarefas</h2>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isCreating ? 'Cancelar' : 'Nova Tarefa'}
            </button>
          </div>

          {isCreating && (
            <div className="mb-8">
              <CreateTaskForm onTaskCreated={handleTaskCreated} />
            </div>
          )}

          <TaskList key={refreshKey} />
        </div>
      </main>
    </div>
  );
}