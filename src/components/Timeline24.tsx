import React, { useState, useRef, useEffect } from 'react';
import { TimeSlot, Activity, ActivityCategory, CATEGORY_STYLES } from '../types';
import { formatHourShort } from '../hooks/useProductivityStore';
import {
  Clock,
  Plus,
  Check,
  Edit2,
  Trash2,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Sparkles,
  ChevronDown,
  Navigation,
} from 'lucide-react';

interface Timeline24Props {
  timeSlots: TimeSlot[];
  onToggleActivity: (id: string) => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  onAddActivityInSlot: (startHour: number) => void;
  isToday: boolean;
  currentHour: number;
}

type PeriodFilter = 'all' | 'morning' | 'afternoon' | 'evening' | 'night';

export const Timeline24: React.FC<Timeline24Props> = ({
  timeSlots,
  onToggleActivity,
  onEditActivity,
  onDeleteActivity,
  onAddActivityInSlot,
  isToday,
  currentHour,
}) => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const currentHourRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to current hour on load if looking at today
  useEffect(() => {
    if (isToday && currentHourRef.current) {
      currentHourRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isToday]);

  const scrollToCurrentHour = () => {
    if (currentHourRef.current) {
      currentHourRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredSlots = timeSlots.filter((slot) => {
    if (periodFilter === 'all') return true;
    if (periodFilter === 'night') return (slot.hour >= 22 && slot.hour <= 23) || (slot.hour >= 0 && slot.hour < 6);
    if (periodFilter === 'morning') return slot.hour >= 6 && slot.hour < 12;
    if (periodFilter === 'afternoon') return slot.hour >= 12 && slot.hour < 17;
    if (periodFilter === 'evening') return slot.hour >= 17 && slot.hour < 22;
    return true;
  });

  const getPeriodIcon = (hour: number) => {
    if (hour >= 6 && hour < 12) return <Sunrise size={14} className="text-[#8E6B17]" />;
    if (hour >= 12 && hour < 17) return <Sun size={14} className="text-[#D0A619]" />;
    if (hour >= 17 && hour < 22) return <Sunset size={14} className="text-[#B34A6E]" />;
    return <Moon size={14} className="text-[#58632C]" />;
  };

  return (
    <div className="bg-[#FFF8E7] rounded-3xl p-5 sm:p-6 border-[2.5px] border-[#26351F] shadow-[4px_4px_0px_#26351F]">
      {/* Timeline Header & Period Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-[#26351F]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#FFE89E] border-2 border-[#26351F] flex items-center justify-center text-[#26351F] shadow-[2px_2px_0px_#26351F]">
            <Clock size={18} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-[#26351F] leading-tight">
              24-Hour Timeline
            </h2>
            <p className="text-xs font-body font-semibold text-[#26351F]/70">
              Complete hourly schedule from 12 AM to 11 PM
            </p>
          </div>
        </div>

        {/* Jump to Current Hour Button (if today) */}
        {isToday && (
          <button
            onClick={scrollToCurrentHour}
            className="py-1.5 px-3 bg-[#DCE9A4] hover:bg-[#c0cd8a] text-[#26351F] rounded-2xl font-display font-bold text-xs border-2 border-[#26351F] shadow-[2px_2px_0px_#26351F] active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            title="Scroll directly to now"
          >
            <Navigation size={13} className="text-[#58632C]" />
            <span>Now: {formatHourShort(currentHour)}</span>
          </button>
        )}
      </div>

      {/* Period Quick Filter Segmented Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <button
          onClick={() => setPeriodFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shrink-0 border ${
            periodFilter === 'all'
              ? 'bg-[#26351F] text-[#FFF8E7] border-[#26351F] shadow-[1.5px_1.5px_0px_#26351F]'
              : 'bg-[#FFFDF5] text-[#26351F] border-[#26351F]/30 hover:bg-[#EFECE1]'
          }`}
        >
          All 24 Hours
        </button>
        <button
          onClick={() => setPeriodFilter('morning')}
          className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shrink-0 border flex items-center gap-1 ${
            periodFilter === 'morning'
              ? 'bg-[#26351F] text-[#FFF8E7] border-[#26351F] shadow-[1.5px_1.5px_0px_#26351F]'
              : 'bg-[#FFFDF5] text-[#26351F] border-[#26351F]/30 hover:bg-[#EFECE1]'
          }`}
        >
          <Sunrise size={13} /> Morning (6 AM - 12 PM)
        </button>
        <button
          onClick={() => setPeriodFilter('afternoon')}
          className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shrink-0 border flex items-center gap-1 ${
            periodFilter === 'afternoon'
              ? 'bg-[#26351F] text-[#FFF8E7] border-[#26351F] shadow-[1.5px_1.5px_0px_#26351F]'
              : 'bg-[#FFFDF5] text-[#26351F] border-[#26351F]/30 hover:bg-[#EFECE1]'
          }`}
        >
          <Sun size={13} /> Afternoon (12 PM - 5 PM)
        </button>
        <button
          onClick={() => setPeriodFilter('evening')}
          className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shrink-0 border flex items-center gap-1 ${
            periodFilter === 'evening'
              ? 'bg-[#26351F] text-[#FFF8E7] border-[#26351F] shadow-[1.5px_1.5px_0px_#26351F]'
              : 'bg-[#FFFDF5] text-[#26351F] border-[#26351F]/30 hover:bg-[#EFECE1]'
          }`}
        >
          <Sunset size={13} /> Evening (5 PM - 10 PM)
        </button>
        <button
          onClick={() => setPeriodFilter('night')}
          className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shrink-0 border flex items-center gap-1 ${
            periodFilter === 'night'
              ? 'bg-[#26351F] text-[#FFF8E7] border-[#26351F] shadow-[1.5px_1.5px_0px_#26351F]'
              : 'bg-[#FFFDF5] text-[#26351F] border-[#26351F]/30 hover:bg-[#EFECE1]'
          }`}
        >
          <Moon size={13} /> Night (10 PM - 6 AM)
        </button>
      </div>

      {/* 24-HOUR SCROLLABLE TIMELINE CONTAINER */}
      <div className="max-h-[640px] overflow-y-auto pr-1 space-y-3 relative">
        {filteredSlots.map((slot) => {
          const isCurrent = slot.isCurrentHour;
          const hasActivities = slot.activities.length > 0;

          return (
            <div
              key={slot.hour}
              ref={isCurrent ? currentHourRef : null}
              className={`rounded-2xl border-2 transition-all p-3 sm:p-3.5 relative ${
                isCurrent
                  ? 'bg-[#FFFBEA] border-[#707B3B] shadow-[3px_3px_0px_#58632C] ring-2 ring-[#707B3B]/40'
                  : 'bg-[#FFFDF5] border-[#26351F] shadow-[2.5px_2.5px_0px_#26351F]'
              }`}
            >
              {/* CURRENT HOUR INDICATOR BADGE */}
              {isCurrent && (
                <div className="absolute -top-2.5 right-4 bg-[#707B3B] text-[#FFF8E7] px-2.5 py-0.5 rounded-full font-display font-bold text-[10px] tracking-wider uppercase border border-[#26351F] shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#F5D66E] animate-ping" />
                  <span>Current Hour</span>
                </div>
              )}

              {/* Slot Header: Time Label + Add Action */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#26351F]/10">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-[#EFECE1] border border-[#26351F]/30 text-[#26351F]">
                    {getPeriodIcon(slot.hour)}
                  </div>
                  <span className="font-display font-bold text-sm sm:text-base text-[#26351F]">
                    {slot.label}
                  </span>
                  {hasActivities && (
                    <span className="text-[11px] font-display font-bold bg-[#EFECE1] border border-[#26351F]/40 px-2 py-0.5 rounded-full text-[#26351F]/80">
                      {slot.activities.length} {slot.activities.length === 1 ? 'task' : 'tasks'}
                    </span>
                  )}
                </div>

                {/* Quick Add Activity Button */}
                <button
                  onClick={() => onAddActivityInSlot(slot.hour)}
                  className="py-1 px-2.5 rounded-xl bg-[#EFECE1] hover:bg-[#DCE9A4] border border-[#26351F] text-[#26351F] font-display font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-[1px_1px_0px_#26351F]"
                  title={`Schedule activity at ${slot.shortLabel}`}
                >
                  <Plus size={13} className="stroke-[2.5]" />
                  <span className="hidden xs:inline">Add</span>
                </button>
              </div>

              {/* Activities within this hour */}
              {hasActivities ? (
                <div className="space-y-2">
                  {slot.activities.map((act) => {
                    const style = CATEGORY_STYLES[act.category];

                    return (
                      <div
                        key={act.id}
                        className={`rounded-xl p-3 border-2 border-[#26351F] transition-all flex items-start gap-2.5 ${
                          act.completed ? 'opacity-70 line-through' : 'shadow-[1.5px_1.5px_0px_#26351F]'
                        }`}
                        style={{ backgroundColor: style.bg }}
                      >
                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => onToggleActivity(act.id)}
                          className={`shrink-0 w-6 h-6 mt-0.5 rounded-lg border-2 border-[#26351F] flex items-center justify-center transition-all cursor-pointer ${
                            act.completed
                              ? 'bg-[#707B3B] text-[#FFF8E7]'
                              : 'bg-[#FFF8E7] hover:bg-[#FFE89E]'
                          }`}
                          aria-label={act.completed ? 'Mark incomplete' : 'Mark completed'}
                        >
                          {act.completed && <Check size={14} className="stroke-[3.5]" />}
                        </button>

                        {/* Title, Category & Description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              onClick={() => onToggleActivity(act.id)}
                              className={`font-body font-bold text-sm sm:text-base leading-snug cursor-pointer select-none break-words ${
                                act.completed
                                  ? 'text-[#26351F]/60 decoration-[#26351F]/60'
                                  : 'text-[#26351F]'
                              }`}
                            >
                              {act.title}
                            </span>

                            {/* Category Badge */}
                            <span
                              className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full border border-[#26351F] uppercase tracking-wider shrink-0 flex items-center gap-1"
                              style={{ backgroundColor: style.badgeBg }}
                            >
                              <span>{style.icon}</span>
                              <span>{style.label}</span>
                            </span>

                            {/* Time span tag if spans multiple hours */}
                            {act.endHour - act.startHour > 1 && (
                              <span className="text-[10px] font-display font-bold bg-[#FFFDF5] border border-[#26351F]/40 px-1.5 py-0.5 rounded-md text-[#26351F]/80">
                                {formatHourShort(act.startHour)} – {formatHourShort(act.endHour)}
                              </span>
                            )}
                          </div>

                          {act.description && (
                            <p className="text-xs font-body font-medium text-[#26351F]/75 mt-1 break-words">
                              {act.description}
                            </p>
                          )}
                        </div>

                        {/* Action buttons (Edit & Delete) */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => onEditActivity(act)}
                            className="p-1 rounded-lg border border-transparent hover:border-[#26351F] hover:bg-[#FFF8E7] text-[#26351F] transition-all cursor-pointer"
                            title="Edit activity"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => onDeleteActivity(act.id)}
                            className="p-1 rounded-lg border border-transparent hover:border-[#26351F] hover:bg-[#FFD9E3] text-[#26351F] transition-all cursor-pointer"
                            title="Delete activity"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Unplanned / Free Slot indicator */
                <div
                  onClick={() => onAddActivityInSlot(slot.hour)}
                  className="py-2.5 px-3 rounded-xl border border-dashed border-[#26351F]/30 hover:border-[#26351F] hover:bg-[#EFECE1]/50 text-center transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-body font-medium text-[#26351F]/50 group-hover:text-[#26351F]">
                    Free / Unplanned time • Click to schedule
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
