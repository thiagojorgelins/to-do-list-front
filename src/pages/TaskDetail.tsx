import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../types';
import { taskService } from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-hot-toast';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!task) return;
    
    try {
      setIsDeleting(true);
      await taskService.deleteTask(task.id);
      toast.success('Tarefa excluída com sucesso');
      navigate('/tasks', { replace: true });
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
      setIsDeleting(false);
    }
  };
  
  useEffect(() => {
    const loadTask = async () => {
      try {
        if (id) {
          const response = await taskService.getTask(parseInt(id));
          setTask(response);
        }
      } catch (error) {
        toast.error('Erro ao carregar tarefa');
        navigate('/tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tarefa não encontrada</h2>
          <button
            onClick={() => navigate('/tasks')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Voltar para lista de tarefas
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string): string => {
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span>Criado em: {formatDate(task.created_at)}</span>
                {task.updated_at && (
                  <span>Atualizado em: {formatDate(task.updated_at)}</span>
                )}
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>

          {task.description && (
            <div className="prose prose-indigo max-w-none mt-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {task.description}
              </ReactMarkdown>
            </div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => navigate('/tasks')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Voltar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                ${isDeleting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'text-white bg-red-600 hover:bg-red-700'} 
                transition-colors duration-200`}
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Excluindo...
                </span>
              ) : (
                'Excluir Tarefa'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}