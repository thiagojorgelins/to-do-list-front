import { Task, TaskStatus, TaskForm } from "../types";
import { useState } from "react";
import { taskService } from "../services/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (task: Task) => void;
}

export function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>(task.status);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Concluída":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      const updateData: Partial<TaskForm> = {
        status: newStatus,
      };
      const updatedTask = await taskService.updateTask(task.id, updateData);
      setCurrentStatus(newStatus);
      onUpdate(updatedTask);
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

  return (
    <Link
      to={`/tasks/${task.id}`}
      className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200"
    >
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{task.title}</h3>
            {task.description && (
              <p className="text-gray-500 mt-1">{task.description}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus}
            </span>
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
