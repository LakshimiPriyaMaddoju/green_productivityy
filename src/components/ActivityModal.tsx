import React, { useState, useEffect } from 'react';
import { Activity, ActivityCategory, CATEGORY_STYLES } from '../types';
import { formatHourShort } from '../hooks/useProductivityStore';
import { X, Clock, Tag, FileText, Check, Plus } from 'lucide-react';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    startHour: number,
    endHour: number,
    category: ActivityCategory,
    description?: string
  ) => void;
  initialActivity?: Activity | null;
  defaultStartHour?: number;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialActivity,
  defaultStartHour = 9,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startHour, setStartHour] = useState(defaultStartHour);
  const [endHour, setEndHour] = useState(Math.min(24, defaultStartHour + 1));
  const [category, setCategory] = useState<ActivityCategory>('work');

  useEffect(() => {
    if (initialActivity) {
      setTitle(initialActivity.title);
      setDescription(initialActivity.description || '');
      setStartHour(initialActivity.startHour);
      setEndHour(initialActivity.endHour);
      setCategory(initialActivity.category);
    } else {
      setTitle('');
      setDescription('');
      setStartHour(defaultStartHour);
      setEndHour(Math.min(24, defaultStartHour + 1));
      setCategory('work');
    }
  }, [initialActivity, defaultStartHour, isOpen]);

  if (!isOpen) return null;

  const handleStartHourChange = (newStart: number) => {
    setStartHour(newStart);
    if (endHour <= newStart) {
      setEndHour(Math.min(24, newStart + 1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), startHour, endHour, category, description);
    onClose();
  };

  const categories: ActivityCategory[] = [
    'study',
    'work',
    'personal',
    'health',
    'exercise',
    'other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26351F]/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8E7] w-full max-w-lg rounded-3xl border-[3px] border-[#26351F] shadow-[6px_6px_0px_#26351F] p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#FFFDF5] border-2 border-[#26351F] text-[#26351F] hover:bg-[#FFD9E3] transition-all cursor-pointer shadow-[2px_2px_0px_#26351F]"
          title="Close"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE89E] border-2 border-[#26351F] flex items-center justify-center text-[#26351F] shadow-[2px_2px_0px_#26351F]">
            <Clock size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#26351F]">
              {initialActivity ? 'Edit Activity' : 'Schedule Activity'}
            </h3>
            <p className="text-xs font-body font-semibold text-[#26351F]/70">
              Assign to your 24-hour daily timeline
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Activity Title */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#26351F] mb-1.5">
              Activity Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep Work Session, Morning Run, Lunch..."
              className="w-full bg-[#FFFDF5] text-[#26351F] placeholder-[#26351F]/40 px-4 py-3 rounded-2xl border-2 border-[#26351F] focus:outline-none focus:border-[#58632C] focus:ring-2 focus:ring-[#707B3B]/20 font-body font-semibold text-sm sm:text-base shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)]"
            />
          </div>

          {/* Time Range Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#26351F] mb-1.5 flex items-center gap-1">
                <Clock size={12} /> Start Time
              </label>
              <select
                value={startHour}
                onChange={(e) => handleStartHourChange(Number(e.target.value))}
                className="w-full bg-[#FFFDF5] text-[#26351F] px-3 py-2.5 rounded-2xl border-2 border-[#26351F] font-display font-bold text-xs sm:text-sm focus:outline-none focus:border-[#58632C] cursor-pointer"
              >
                {Array.from({ length: 24 }).map((_, h) => (
                  <option key={h} value={h}>
                    {formatHourShort(h)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#26351F] mb-1.5 flex items-center gap-1">
                <Clock size={12} /> End Time
              </label>
              <select
                value={endHour}
                onChange={(e) => setEndHour(Number(e.target.value))}
                className="w-full bg-[#FFFDF5] text-[#26351F] px-3 py-2.5 rounded-2xl border-2 border-[#26351F] font-display font-bold text-xs sm:text-sm focus:outline-none focus:border-[#58632C] cursor-pointer"
              >
                {Array.from({ length: 24 - startHour }).map((_, idx) => {
                  const h = startHour + 1 + idx;
                  return (
                    <option key={h} value={h}>
                      {formatHourShort(h)} {h === 24 ? '(Next Day)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Duration Badge */}
          <div className="bg-[#FFFDF5] border border-[#26351F]/20 rounded-xl px-3 py-1.5 text-xs font-display font-bold text-[#26351F]/80 flex items-center justify-between">
            <span>Scheduled Duration:</span>
            <span className="bg-[#DCE9A4] border border-[#26351F] px-2 py-0.5 rounded-full text-[#26351F]">
              {endHour - startHour} {endHour - startHour === 1 ? 'Hour' : 'Hours'}
            </span>
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#26351F] mb-2 flex items-center gap-1">
              <Tag size={12} /> Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {categories.map((catKey) => {
                const style = CATEGORY_STYLES[catKey];
                const isSelected = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setCategory(catKey)}
                    className={`py-2 px-1 rounded-xl border-2 border-[#26351F] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'shadow-[2px_2px_0px_#26351F] -translate-y-0.5 font-bold'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: isSelected ? style.badgeBg : '#FFFDF5',
                    }}
                  >
                    <span className="text-base">{style.icon}</span>
                    <span className="text-[11px] font-display font-bold text-[#26351F]">
                      {style.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#26351F] mb-1.5 flex items-center gap-1">
              <FileText size={12} /> Notes / Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key goals, links, or specific checklist details..."
              rows={2}
              className="w-full bg-[#FFFDF5] text-[#26351F] placeholder-[#26351F]/40 p-3 rounded-2xl border-2 border-[#26351F] focus:outline-none focus:border-[#58632C] focus:ring-2 focus:ring-[#707B3B]/20 font-body text-xs sm:text-sm font-medium resize-none shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-[#FFFDF5] text-[#26351F] rounded-2xl font-display font-bold text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:bg-[#EFECE1] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#A8C69F] text-[#26351F] rounded-2xl font-display font-bold text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#26351F] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {initialActivity ? <Check size={16} /> : <Plus size={16} className="stroke-[3]" />}
              <span>{initialActivity ? 'Update Activity' : 'Add Activity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
