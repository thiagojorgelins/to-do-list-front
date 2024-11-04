import { useState, useEffect } from "react";
import { Task, PaginatedTasks, TaskForm } from "../types";
import { taskService } from "../services/api";
import { TaskItem } from "./TaskItem";
import { toast } from "react-hot-toast";

export function TaskList() {
  const [taskData, setTaskData] = useState<PaginatedTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadTasks = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(page);
      setTaskData(response);
    } catch (error) {
      toast.error("Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      toast.success('Tarefa excluída com sucesso');
      loadTasks(currentPage);
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
    }
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      const updateData: Partial<TaskForm> = {
        status: updatedTask.status,
        title: updatedTask.title,
        description: updatedTask.description,
      };
      await taskService.updateTask(updatedTask.id, updateData);
      loadTasks(currentPage);
      toast.success("Tarefa atualizada com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar tarefa");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!taskData) {
    return <div>Nenhuma tarefa encontrada</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
      {taskData?.data.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4 pb-4">
        <div className="text-sm text-gray-700">
          Página {taskData.current_page} de {taskData.total_pages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={!taskData.previous}
            className={`px-4 py-2 rounded-md ${
              taskData.previous
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!taskData.next}
            className={`px-4 py-2 rounded-md ${
              taskData.next
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
