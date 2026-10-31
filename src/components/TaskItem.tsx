import React, { useState } from 'react';
import { Task, TaskCategory, TaskPriority } from '../types';
import { Check, Edit2, Trash2, X, CheckCheck } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string, category?: TaskCategory, priority?: TaskPriority) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text || task.title || '');

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') {
      setEditText(task.text || task.title || '');
      setIsEditing(false);
    }
  };

  const categoryColor: Record<string, string> = {
    study: 'bg-[#EAF0D0]',
    work: 'bg-[#DCE9A4]',
    personal: 'bg-[#FFE89E]',
    health: 'bg-[#FFD9E3]',
    exercise: 'bg-[#E3F4E5]',
    learning: 'bg-[#C6C99F]',
    other: 'bg-[#EFECE1]',
  };

  const priorityBadge: Record<TaskPriority, { icon: string; label: string }> = {
    low: { icon: '🌱', label: 'Gentle' },
    medium: { icon: '🌿', label: 'Normal' },
    high: { icon: '🌸', label: 'Priority' },
  };

  return (
    <div
      className={`group relative rounded-2xl p-3.5 sm:p-4 border-2 border-[#26351F] transition-all duration-200 ${
        task.completed
          ? 'bg-[#EFECE1]/75 shadow-[2px_2px_0px_#26351F] opacity-80'
          : 'bg-[#FFFDF5] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:-translate-y-[1px]'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Cute Squircle Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`shrink-0 w-7 h-7 mt-0.5 rounded-xl border-2 border-[#26351F] flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-[#707B3B] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
              : 'bg-[#FFF8E7] hover:bg-[#FFE89E] shadow-[2px_2px_0px_#26351F]'
          }`}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.completed && (
            <Check size={17} className="stroke-[3.5] animate-scale-in" />
          )}
        </button>

        {/* Task Content / Edit Mode */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full bg-[#FFF8E7] text-[#26351F] px-3 py-1.5 rounded-xl border-2 border-[#26351F] focus:outline-none focus:ring-2 focus:ring-[#707B3B] font-body text-sm font-medium"
              />
              <button
                onClick={handleSaveEdit}
                className="p-1.5 bg-[#A8C69F] rounded-xl border-2 border-[#26351F] text-[#26351F] hover:bg-[#DCE9A4] transition-colors cursor-pointer"
                title="Save changes"
              >
                <CheckCheck size={16} />
              </button>
              <button
                onClick={() => {
                  setEditText(task.text || task.title || '');
                  setIsEditing(false);
                }}
                className="p-1.5 bg-[#FFD9E3] rounded-xl border-2 border-[#26351F] text-[#26351F] hover:bg-[#F5A0B7] transition-colors cursor-pointer"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <span
                onClick={() => onToggle(task.id)}
                className={`font-body text-base font-semibold leading-relaxed cursor-pointer select-none transition-all break-words ${
                  task.completed
                    ? 'line-through text-[#26351F]/60 decoration-[#26351F]/50 decoration-2'
                    : 'text-[#26351F]'
                }`}
              >
                {task.text}
              </span>

              {/* Metadata Badges (Category & Priority) */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full border border-[#26351F] uppercase tracking-wider ${
                    categoryColor[task.category] || 'bg-[#EFECE1]'
                  }`}
                >
                  {task.category}
                </span>

                {task.priority && (
                  <span className="text-xs font-body font-semibold text-[#26351F]/80 flex items-center gap-1">
                    <span>{priorityBadge[task.priority]?.icon || '🌱'}</span>
                    <span className="text-[11px] font-display font-bold">
                      {priorityBadge[task.priority]?.label || 'Normal'}
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons (Edit & Delete) */}
        {!isEditing && (
          <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-xl border-1.5 border-transparent hover:border-[#26351F] hover:bg-[#FFF8E7] text-[#26351F] transition-all cursor-pointer"
              title="Edit task"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-xl border-1.5 border-transparent hover:border-[#26351F] hover:bg-[#FFD9E3] text-[#26351F] transition-all cursor-pointer"
              title="Delete task"
            >
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
