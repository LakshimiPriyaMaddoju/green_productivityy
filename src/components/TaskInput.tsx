import React, { useState } from 'react';
import { Plus, Tag, Flag } from 'lucide-react';
import { TaskCategory, TaskPriority } from '../types';

interface TaskInputProps {
  onAddTask: (text: string, category: TaskCategory, priority: TaskPriority, notes?: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text, category, priority);
    setText('');
  };

  const categories: { label: string; value: TaskCategory; color: string }[] = [
    { label: 'Work', value: 'work', color: '#DCE9A4' },
    { label: 'Personal', value: 'personal', color: '#FFE89E' },
    { label: 'Health', value: 'health', color: '#FFD9E3' },
    { label: 'Learning', value: 'learning', color: '#C6C99F' },
  ];

  const priorities: { label: string; value: TaskPriority; symbol: string }[] = [
    { label: 'Gentle', value: 'low', symbol: '🌱' },
    { label: 'Normal', value: 'medium', symbol: '🌿' },
    { label: 'High', value: 'high', symbol: '🌸' },
  ];

  return (
    <div className="bg-[#FFF8E7] rounded-3xl p-5 border-[2.5px] border-[#26351F] shadow-[4px_4px_0px_#26351F] mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Main Input Row */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What would you like to achieve today?..."
              className="w-full bg-[#FFFDF5] text-[#26351F] placeholder-[#26351F]/45 px-4 py-3 sm:py-3.5 rounded-2xl border-2 border-[#26351F] focus:outline-none focus:border-[#58632C] focus:ring-2 focus:ring-[#707B3B]/20 font-body font-medium text-base transition-all shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)]"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Toggle for Category / Priority */}
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className={`p-3 rounded-2xl border-2 border-[#26351F] transition-all cursor-pointer font-display text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#26351F] ${
                showOptions ? 'bg-[#FFE89E]' : 'bg-[#EFECE1] hover:bg-[#FFFDF5]'
              }`}
              title="Add Category or Priority"
            >
              <Tag size={16} />
              <span className="hidden xs:inline">Tag</span>
            </button>

            {/* Add Task Button */}
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex-1 sm:flex-initial py-3 sm:py-3.5 px-6 bg-[#A8C69F] disabled:opacity-50 disabled:cursor-not-allowed text-[#26351F] rounded-2xl font-display font-bold text-sm sm:text-base border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Plus size={18} className="stroke-[3]" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Expandable Options for Category & Priority */}
        {showOptions && (
          <div className="pt-2 border-t-2 border-[#26351F]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-display">
            {/* Categories */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#26351F]/70 font-bold mr-1 flex items-center gap-1">
                <Tag size={12} /> Category:
              </span>
              {categories.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`px-2.5 py-1 rounded-xl border border-[#26351F] font-bold transition-all cursor-pointer ${
                    category === c.value
                      ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                      : 'bg-[#FFFDF5] text-[#26351F] hover:bg-[#EFECE1]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Priorities */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#26351F]/70 font-bold mr-1 flex items-center gap-1">
                <Flag size={12} /> Priority:
              </span>
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`px-2 py-1 rounded-xl border border-[#26351F] font-bold transition-all cursor-pointer ${
                    priority === p.value
                      ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                      : 'bg-[#FFFDF5] text-[#26351F] hover:bg-[#EFECE1]'
                  }`}
                >
                  {p.symbol} {p.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
