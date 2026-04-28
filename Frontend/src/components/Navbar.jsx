

import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../contexts/useAuth';
import useTheme from '../contexts/useTheme';
import { FiLogOut, FiMoon, FiSun, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  return (
    <nav className={`border-b shadow-sm backdrop-blur-md transition-colors duration-300 ${isDark ? 'border-slate-800 bg-slate-950/85' : 'border-slate-200 bg-white/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center">
            <Link to="/dashboard" className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              TaskNest
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${isDark ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600 hover:bg-slate-800' : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200'}`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <FiSun /> : <FiMoon />}
                <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
              </button>

              <div className={`hidden items-center space-x-2 rounded-full px-3 py-2 md:flex ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <FiUser className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className={`inline-flex items-center space-x-1 rounded-full px-3 py-2 text-red-600 transition-colors ${isDark ? 'hover:bg-red-950/40' : 'hover:bg-red-50 hover:text-red-700'}`}
              >
                <FiLogOut />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};



export default Navbar;