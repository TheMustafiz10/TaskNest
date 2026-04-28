import { FiEdit2, FiTrash2, FiCheckCircle, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import useTheme from '../contexts/useTheme';


const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { isDark } = useTheme();

  return (
    <div className={`group rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${isDark ? 'border-slate-800 bg-slate-900/90 shadow-none hover:border-slate-700 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`text-lg font-semibold transition-colors group-hover:text-blue-600 ${isDark ? 'text-slate-100 dark:group-hover:text-blue-400' : 'text-slate-900'}`}>
          {task.title}
        </h3>
        <div className="flex space-x-2 opacity-90 transition-transform duration-200 group-hover:translate-y-[-1px]">
          <button
            onClick={() => onEdit(task)}
            className={`rounded-full p-2 transition-colors ${isDark ? 'text-blue-400 hover:bg-blue-950/40 hover:text-blue-300' : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'}`}
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className={`rounded-full p-2 transition-colors ${isDark ? 'text-red-400 hover:bg-red-950/40 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'}`}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      

      {task.description && (
        <p className={`mb-4 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{task.description}</p>
      )}
      
      <div className="mb-3 flex flex-wrap gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusColors[task.status]}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      {task.dueDate && (
        <div className={`flex items-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <FiClock className="mr-1" />
          <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
        </div>
      )}
      
      {task.status === 'completed' && (
        <div className={`mt-3 flex items-center ${isDark ? 'text-green-400' : 'text-green-600'}`}>
          <FiCheckCircle className="mr-1" />
          <span className="text-sm">Completed</span>
        </div>
      )}
    </div>
  );
};



export default TaskCard;