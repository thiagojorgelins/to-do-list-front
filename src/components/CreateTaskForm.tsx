import { useForm } from 'react-hook-form';
import { TaskForm, TaskStatus } from '../types';
import { taskService } from '../services/api';
import { toast } from 'react-hot-toast';

export function CreateTaskForm({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const { register, handleSubmit, reset } = useForm<TaskForm>({
    defaultValues: {
      title: '',
      description: '',
      status: 'Pendente' as TaskStatus,
    },
  });

  const onSubmit = async (data: TaskForm) => {
    try {
      await taskService.createTask(data);
      toast.success('Tarefa criada com sucesso');
      reset();
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      toast.error('Erro ao criar tarefa');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Criar Nova Tarefa</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Título</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-2"
          placeholder="Digite o título da tarefa"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Descrição</label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-2"
          placeholder="Digite a descrição da tarefa"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Status</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-2"
        >
          <option value="Pendente">📋 Pendente</option>
          <option value="Em andamento">🔄 Em andamento</option>
          <option value="Concluída">✅ Concluída</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
      >
        Criar Tarefa
      </button>
    </form>
  );
}
