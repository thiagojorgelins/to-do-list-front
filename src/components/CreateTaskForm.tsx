import { useForm } from 'react-hook-form';
import { TaskForm, TaskStatus } from '../types';
import { taskService } from '../services/api';
import { toast } from 'react-hot-toast';

export function CreateTaskForm({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const { register, handleSubmit, reset } = useForm<TaskForm>({
    defaultValues: {
      title: '',
      description: '',
      status: 'Pendente' as TaskStatus
    }
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Criar Tarefa
      </button>
    </form>
  );
}