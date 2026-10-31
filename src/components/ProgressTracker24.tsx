import React from 'react';
import { Sparkles, Trophy, CheckCircle, Clock3, ListTodo, SunMedium, Moon } from 'lucide-react';

interface ProgressTracker24Props {
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  completionPercentage: number;
  scheduledHours: number;
  unplannedHours: number;
  encouragingMessage: string;
}

export const ProgressTracker24: React.FC<ProgressTracker24Props> = ({
  totalActivities,
  completedActivities,
  pendingActivities,
  completionPercentage,
  scheduledHours,
  unplannedHours,
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
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-[#26351F] leading-tight">
              24-Hour Progress
            </h2>
            <p className="text-[11px] font-body font-semibold text-[#26351F]/70">
              Daily scheduled activities & focus tracking
            </p>
          </div>
        </div>

        {/* Percentage Pill */}
        <div className="bg-[#F5A0B7] text-[#26351F] border-2 border-[#26351F] shadow-[2px_2px_0px_#26351F] px-3.5 py-1 rounded-full font-display font-bold text-sm sm:text-base tabular-nums flex items-center gap-1">
          <Sparkles size={14} className="stroke-[2.5]" />
          <span>{completionPercentage}%</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative mb-4">
        <div className="h-5 sm:h-6 w-full bg-[#EFECE1] rounded-full border-2 border-[#26351F] overflow-hidden p-[2px]">
          <div
            className="h-full bg-[#707B3B] rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-1 relative"
            style={{ width: `${Math.max(completionPercentage, totalActivities > 0 ? 4 : 0)}%` }}
          >
            {/* Striped pattern overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 6px, #FFF8E7 6px, #FFF8E7 12px)',
              }}
            />
          </div>
        </div>

        {/* Milestone labels */}
        <div className="flex justify-between items-center text-[11px] font-display font-bold text-[#26351F]/70 px-1 mt-1.5">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Dynamic Encouraging Message Banner */}
      <div className="bg-[#F5F4EC] border-2 border-[#26351F] rounded-2xl p-3 mb-4 text-center shadow-[2px_2px_0px_#26351F]">
        <p className="font-display font-bold text-xs sm:text-sm text-[#26351F] flex items-center justify-center gap-1.5">
          <span>{encouragingMessage}</span>
        </p>
      </div>

      {/* 24-Hour Time Budget Row (Scheduled Hours vs Free/Unplanned Hours) */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-2.5 sm:p-3 shadow-[2px_2px_0px_#26351F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-[#DCE9A4] border border-[#26351F] text-[#26351F]">
              <SunMedium size={16} />
            </div>
            <div>
              <span className="text-[11px] font-display font-bold text-[#26351F]/70 block leading-tight">
                Scheduled
              </span>
              <span className="font-display font-bold text-lg sm:text-xl text-[#26351F] tabular-nums">
                {scheduledHours}h
              </span>
            </div>
          </div>
          <span className="text-[10px] font-display font-bold bg-[#DCE9A4] border border-[#26351F] px-1.5 py-0.5 rounded-full text-[#26351F]">
            {Math.round((scheduledHours / 24) * 100)}% Day
          </span>
        </div>

        <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-2.5 sm:p-3 shadow-[2px_2px_0px_#26351F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-[#FFE89E] border border-[#26351F] text-[#26351F]">
              <Moon size={16} />
            </div>
            <div>
              <span className="text-[11px] font-display font-bold text-[#26351F]/70 block leading-tight">
                Free / Unplanned
              </span>
              <span className="font-display font-bold text-lg sm:text-xl text-[#26351F] tabular-nums">
                {unplannedHours}h
              </span>
            </div>
          </div>
          <span className="text-[10px] font-display font-bold bg-[#FFE89E] border border-[#26351F] px-1.5 py-0.5 rounded-full text-[#26351F]">
            {Math.round((unplannedHours / 24) * 100)}% Free
          </span>
        </div>
      </div>

      {/* 3 Activity Stats Counters */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {/* Total Activities */}
        <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-2 sm:p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
          <div className="flex items-center justify-center gap-1 text-[#26351F]/80 text-[11px] font-bold mb-0.5">
            <ListTodo size={12} />
            <span>Total</span>
          </div>
          <div className="font-display font-bold text-lg sm:text-xl text-[#26351F] tabular-nums">
            {totalActivities}
          </div>
        </div>

        {/* Completed Activities */}
        <div className="bg-[#DCE9A4] border-2 border-[#26351F] rounded-2xl p-2 sm:p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
          <div className="flex items-center justify-center gap-1 text-[#26351F] text-[11px] font-bold mb-0.5">
            <CheckCircle size={12} className="text-[#58632C]" />
            <span>Done</span>
          </div>
          <div className="font-display font-bold text-lg sm:text-xl text-[#26351F] tabular-nums">
            {completedActivities}
          </div>
        </div>

        {/* Pending Activities */}
        <div className="bg-[#FFE89E] border-2 border-[#26351F] rounded-2xl p-2 sm:p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
          <div className="flex items-center justify-center gap-1 text-[#26351F] text-[11px] font-bold mb-0.5">
            <Clock3 size={12} className="text-[#8e5e00]" />
            <span>Pending</span>
          </div>
          <div className="font-display font-bold text-lg sm:text-xl text-[#26351F] tabular-nums">
            {pendingActivities}
          </div>
        </div>
      </div>
    </div>
  );
};
