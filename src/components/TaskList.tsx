import React, { useState } from 'react';
import { Task, TaskCategory, TaskPriority } from '../types';
import { TaskItem } from './TaskItem';
import { CheckCircle2, Clock, ListFilter, Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string, category?: TaskCategory, priority?: TaskPriority) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const filteredTasks =
    filter === 'pending'
      ? pendingTasks
      : filter === 'completed'
      ? completedTasks
      : tasks;

  return (
    <div className="bg-[#FFF8E7] rounded-3xl p-5 sm:p-6 border-[2.5px] border-[#26351F] shadow-[4px_4px_0px_#26351F]">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-[#26351F]/15">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#DCE9A4] border-2 border-[#26351F] flex items-center justify-center text-[#26351F]">
            <ListFilter size={16} className="stroke-[2.5]" />
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#26351F]">
            Today's To-Do List
          </h2>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 bg-[#EFECE1] p-1 rounded-2xl border-2 border-[#26351F]">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'pending'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            <Clock size={12} />
            Pending ({pendingTasks.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'completed'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            <CheckCircle2 size={12} />
            Done ({completedTasks.length})
          </button>
        </div>
      </div>

      {/* Task Items List */}
      {filteredTasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        /* Empty State with cute stationery graphics */
        <div className="text-center py-10 px-4 flex flex-col items-center justify-center bg-[#FFFDF5] rounded-2xl border-2 border-dashed border-[#26351F]/30">
          <div className="w-14 h-14 rounded-full bg-[#FFE89E] border-2 border-[#26351F] flex items-center justify-center text-[#26351F] mb-3 shadow-[2px_2px_0px_#26351F]">
            <Sparkles size={26} className="text-[#58632C]" />
          </div>
          <h3 className="font-display font-bold text-base sm:text-lg text-[#26351F] mb-1">
            {filter === 'completed'
              ? 'No completed tasks yet'
              : filter === 'pending'
              ? 'All caught up! Zero pending tasks 🎉'
              : 'Your notebook is empty'}
          </h3>
          <p className="text-xs sm:text-sm font-body text-[#26351F]/70 max-w-xs text-balance">
            {filter === 'completed'
              ? 'Check off any tasks from your list to see them flourish here.'
              : filter === 'pending'
              ? 'Enjoy the free moment or add a new goal above!'
              : 'Add your intentions for today using the input field above.'}
          </p>
        </div>
      )}
    </div>
  );
};
