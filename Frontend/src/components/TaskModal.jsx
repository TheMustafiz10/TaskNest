import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import useTheme from '../contexts/useTheme';

const getInitialForm = (task) => ({
  title: task?.title || '',
  description: task?.description || '',
  status: task?.status || 'pending',
  priority: task?.priority || 'medium',
  dueDate: task?.dueDate ? task.dueDate.split('T')[0] : ''
});

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState(() => getInitialForm(task));
  const { isDark } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fieldClassName = `w-full rounded-lg border px-3 py-2 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:ring-2 ${isDark ? 'border-slate-700 bg-slate-900 text-slate-100 focus:ring-blue-500' : 'border-slate-300 bg-white text-slate-900 focus:ring-blue-500'}`;
  const dateFieldClassName = `${fieldClassName} date-input-dark-icon`;
  const secondaryButtonClassName = `rounded-lg px-4 py-2 shadow-sm transition-all duration-200 active:scale-[0.99] ${isDark ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300 hover:shadow-md'}`;
  const primaryButtonClassName = `rounded-lg px-4 py-2 text-white shadow-sm transition-all duration-200 active:scale-[0.99] ${isDark ? 'bg-blue-500 hover:bg-blue-400 hover:shadow-md' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`;

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className={`max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border shadow-2xl ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
        <div className={`flex items-center justify-between border-b p-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className={`rounded-full p-2 transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-300' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}>
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className={fieldClassName}
              placeholder="Enter task title"
            />
          </div>
          
          <div>
            <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className={fieldClassName}
              placeholder="Enter task description"
            />
          </div>
          
          <div>
            <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={fieldClassName}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={fieldClassName}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={dateFieldClassName}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={secondaryButtonClassName}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={primaryButtonClassName}
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default TaskModal;