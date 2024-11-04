import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">ToDo List</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-gray-700">Olá, {user.username}!</span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}