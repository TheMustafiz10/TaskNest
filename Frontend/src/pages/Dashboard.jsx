import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { FiPlus, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useTheme from '../contexts/useTheme';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalVersion, setModalVersion] = useState(0);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { isDark } = useTheme();

  const fetchTasks = async () => {
    try {
      const response = await taskApi.getAll();
      setTasks(response.data);
    } catch {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchTasks();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskApi.create(taskData);
      setTasks([response.data, ...tasks]);
      toast.success('Task created successfully');
      setModalOpen(false);
    } catch {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await taskApi.update(id, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      toast.success('Task updated successfully');
      setEditingTask(null);
      setModalOpen(false);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.delete(id);
        setTasks(tasks.filter(task => task._id !== id));
        toast.success('Task deleted successfully');
      } catch {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalVersion(version => version + 1);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const statusBreakdown = [
    { key: 'pending', label: 'Pending', value: stats.pending, color: isDark ? 'bg-yellow-400' : 'bg-yellow-500', track: isDark ? 'bg-yellow-400/15' : 'bg-yellow-100' },
    { key: 'in-progress', label: 'In Progress', value: stats.inProgress, color: isDark ? 'bg-blue-400' : 'bg-blue-600', track: isDark ? 'bg-blue-400/15' : 'bg-blue-100' },
    { key: 'completed', label: 'Completed', value: stats.completed, color: isDark ? 'bg-green-400' : 'bg-green-600', track: isDark ? 'bg-green-400/15' : 'bg-green-100' }
  ];

  const priorityStats = {
    low: tasks.filter(task => task.priority === 'low').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    high: tasks.filter(task => task.priority === 'high').length
  };

  const priorityBreakdown = [
    { key: 'low', label: 'Low', value: priorityStats.low, color: isDark ? 'bg-slate-400' : 'bg-slate-500', track: isDark ? 'bg-slate-400/15' : 'bg-slate-100' },
    { key: 'medium', label: 'Medium', value: priorityStats.medium, color: isDark ? 'bg-amber-400' : 'bg-amber-500', track: isDark ? 'bg-amber-400/15' : 'bg-amber-100' },
    { key: 'high', label: 'High', value: priorityStats.high, color: isDark ? 'bg-rose-400' : 'bg-rose-600', track: isDark ? 'bg-rose-400/15' : 'bg-rose-100' }
  ];

  const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  const dueSoonCount = tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    if (Number.isNaN(dueDate.getTime())) return false;
    const now = new Date();
    const sevenDaysAhead = new Date(now);
    sevenDaysAhead.setDate(now.getDate() + 7);
    return dueDate >= now && dueDate <= sevenDaysAhead;
  }).length;

  const urgentCount = tasks.filter(task => task.priority === 'high' && task.status !== 'completed').length;

  const statCardClass = isDark
    ? 'rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft'
    : 'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  
  return (
    <div className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>My Tasks</h1>
        <button
          onClick={() => {
            setEditingTask(null);
            setModalVersion(version => version + 1);
            setModalOpen(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <FiPlus />
          <span>New Task</span>
        </button>
      </div>




      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
            isDark
              ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <FiFilter />
          <span>Filters</span>
        </button>
        


        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'all' ? (isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white') : (isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700')
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'pending' ? 'bg-yellow-600 text-white' : (isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700')
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'in-progress' ? (isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white') : (isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700')
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'completed' ? (isDark ? 'bg-green-500 text-white' : 'bg-green-600 text-white') : (isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700')
              }`}
            >
              Completed
            </button>
          </div>
        )}
      </div>



      {filteredTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-lg text-slate-500 dark:text-slate-300">No tasks found</p>
          <p className="mt-2 text-slate-400 dark:text-slate-400">Click the "New Task" button to create your first task</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={statCardClass}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className={`text-sm font-medium uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Task overview</p>
              <h2 className={`mt-1 text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Status breakdown</h2>
            </div>
            <div className={`rounded-full px-3 py-1 text-sm font-semibold ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
              {completionRate}% complete
            </div>
          </div>

          <div className="space-y-4">
            {statusBreakdown.map((item) => (
              <div key={item.key}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.label}</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{item.value} task{item.value === 1 ? '' : 's'}</span>
                </div>
                <div className={`h-3 overflow-hidden rounded-full ${item.track}`}>
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${stats.total ? (item.value / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={statCardClass}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className={`text-sm font-medium uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Task health</p>
              <h2 className={`mt-1 text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Priority mix</h2>
            </div>
            <div className={`rounded-full px-3 py-1 text-sm font-semibold ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
              {urgentCount} urgent
            </div>
          </div>

          <div className="space-y-4">
            {priorityBreakdown.map((item) => (
              <div key={item.key}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.label}</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{item.value} task{item.value === 1 ? '' : 's'}</span>
                </div>
                <div className={`h-3 overflow-hidden rounded-full ${item.track}`}>
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${stats.total ? (item.value / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className={`rounded-2xl border p-3 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
              <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Complete</p>
              <p className={`mt-1 text-lg font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{completionRate}%</p>
            </div>
            <div className={`rounded-2xl border p-3 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
              <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Due soon</p>
              <p className={`mt-1 text-lg font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{dueSoonCount}</p>
            </div>
            <div className={`rounded-2xl border p-3 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'} sm:col-span-1 col-span-2`}>
              <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Open</p>
              <p className={`mt-1 text-lg font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{stats.total - stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

  
      <TaskModal
        key={`${editingTask ? editingTask._id : 'new-task'}-${modalVersion}`}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={editingTask ? (data) => handleUpdateTask(editingTask._id, data) : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
};



export default Dashboard;