import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { Book, User as UserIcon, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">FirmAI</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};