import React from 'react';
import { Sparkles, Trophy, CheckCircle, Clock3, ListTodo } from 'lucide-react';

interface ProgressTrackerProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionPercentage: number;
  encouragingMessage: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  completionPercentage,
  encouragingMessage,
}) => {
  return (
    <div className="bg-[#FFF8E7] rounded-3xl p-5 sm:p-6 border-[2.5px] border-[#26351F] shadow-[4px_4px_0px_#26351F] transition-all">
      {/* Header with Title and Cute Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C6C99F] border-2 border-[#26351F] flex items-center justify-center text-[#26351F]">
            <Trophy size={16} className="stroke-[2.5]" />
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#26351F]">
            Daily Progress
          </h2>
        </div>

        {/* Percentage Pill */}
        <div className="bg-[#F5A0B7] text-[#26351F] border-2 border-[#26351F] shadow-[2px_2px_0px_#26351F] px-3.5 py-1 rounded-full font-display font-bold text-sm sm:text-base tabular-nums flex items-center gap-1">
          <Sparkles size={14} className="stroke-[2.5]" />
          <span>{completionPercentage}%</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative mb-5">
        <div className="h-5 sm:h-6 w-full bg-[#EFECE1] rounded-full border-2 border-[#26351F] overflow-hidden p-[2px]">
          <div
            className="h-full bg-[#707B3B] rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-1 relative"
            style={{ width: `${Math.max(completionPercentage, totalTasks > 0 ? 4 : 0)}%` }}
          >
            {/* Striped pattern overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, #FFF8E7 6px, #FFF8E7 12px)',
              }}
            />
          </div>
        </div>

        {/* Milestone marker flowers */}
        <div className="flex justify-between items-center text-[11px] font-display font-bold text-[#26351F]/70 px-1 mt-1.5">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Dynamic Encouraging Message Banner */}
      <div className="bg-[#F5F4EC] border-2 border-[#26351F] rounded-2xl p-3.5 mb-5 text-center shadow-[2px_2px_0px_#26351F]">
        <p className="font-display font-bold text-sm sm:text-base text-[#26351F] flex items-center justify-center gap-2">
          <span>{encouragingMessage}</span>
        </p>
      </div>

      {/* 3 Stats Counters */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Total Tasks */}
        <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-2.5 sm:p-3 text-center shadow-[2px_2px_0px_#26351F]">
          <div className="flex items-center justify-center gap-1 text-[#26351F]/80 text-xs font-bold mb-0.5">
            <ListTodo size={13} />
            <span>Total</span>
          </div>
          <div className="font-display font-bold text-xl sm:text-2xl text-[#26351F] tabular-nums">
            {totalTasks}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-[#DCE9A4] border-2 border-[#26351F] rounded-2xl p-2.5 sm:p-3 text-center shadow-[2px_2px_0px_#26351F]">
          <div className="flex items-center justify-center gap-1 text-[#26351F] text-xs font-bold mb-0.5">
            <CheckCircle size={13} className="text-[#58632C]" />
            <span>Done</span>
          </div>
          <div className="font-display font-bold text-xl sm:text-2xl text-[#26351F] tabular-nums">
            {completedTasks}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-[#FFE89E] border-2 border-[#26351F] rounded-2xl p-2.5 sm:p-3 text-center shadow-[2px_2px_0px_#26351F]">
          <div className="flex items-center justify-center gap-1 text-[#26351F] text-xs font-bold mb-0.5">
            <Clock3 size={13} className="text-[#8e5e00]" />
            <span>Pending</span>
          </div>
          <div className="font-display font-bold text-xl sm:text-2xl text-[#26351F] tabular-nums">
            {pendingTasks}
          </div>
        </div>
      </div>
    </div>
  );
};
