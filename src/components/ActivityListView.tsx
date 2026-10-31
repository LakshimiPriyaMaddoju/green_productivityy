import React, { useState } from 'react';
import { Activity, ActivityCategory, CATEGORY_STYLES } from '../types';
import { formatHourShort } from '../hooks/useProductivityStore';
import {
  ListFilter,
  Check,
  Edit2,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
  ListTodo,
} from 'lucide-react';

interface ActivityListViewProps {
  activities: Activity[];
  onToggleActivity: (id: string) => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  onOpenAddModal: () => void;
  currentHour: number;
}

export const ActivityListView: React.FC<ActivityListViewProps> = ({
  activities,
  onToggleActivity,
  onEditActivity,
  onDeleteActivity,
  onOpenAddModal,
  currentHour,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'upcoming'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter logic
  const filteredActivities = activities.filter((act) => {
    // Status filter
    if (statusFilter === 'pending' && act.completed) return false;
    if (statusFilter === 'completed' && !act.completed) return false;
    if (statusFilter === 'upcoming') {
      // Upcoming: not completed and startHour >= currentHour
      if (act.completed || act.startHour < currentHour) return false;
    }

    // Category filter
    if (categoryFilter !== 'all' && act.category !== categoryFilter) return false;

    return true;
  });

  // Sort by start hour ascending
  const sortedActivities = [...filteredActivities].sort((a, b) => a.startHour - b.startHour);

  const pendingCount = activities.filter((a) => !a.completed).length;
  const completedCount = activities.filter((a) => a.completed).length;
  const upcomingCount = activities.filter((a) => !a.completed && a.startHour >= currentHour).length;

  return (
    <div className="bg-[#FFF8E7] rounded-3xl p-5 sm:p-6 border-[2.5px] border-[#26351F] shadow-[4px_4px_0px_#26351F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#26351F]/15">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#DCE9A4] border-2 border-[#26351F] flex items-center justify-center text-[#26351F]">
            <ListFilter size={16} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-[#26351F]">
              Daily Activities List
            </h2>
            <p className="text-[11px] font-body font-semibold text-[#26351F]/70">
              Filter by status & categories
            </p>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-[#EFECE1] p-1 rounded-2xl border-2 border-[#26351F] flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            All ({activities.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
              statusFilter === 'upcoming'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-1 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                : 'text-[#26351F] hover:bg-[#FFFDF5]'
            }`}
          >
            Done ({completedCount})
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 text-xs font-display">
        <span className="text-[#26351F]/70 font-bold shrink-0">Category:</span>
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-2.5 py-1 rounded-xl border border-[#26351F] font-bold cursor-pointer transition-all ${
            categoryFilter === 'all' ? 'bg-[#26351F] text-[#FFF8E7]' : 'bg-[#FFFDF5] text-[#26351F]'
          }`}
        >
          All
        </button>
        {(['study', 'work', 'personal', 'health', 'exercise', 'other'] as ActivityCategory[]).map(
          (cat) => {
            const style = CATEGORY_STYLES[cat];
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-xl border border-[#26351F] font-bold cursor-pointer transition-all shrink-0 ${
                  categoryFilter === cat ? 'bg-[#26351F] text-[#FFF8E7]' : 'bg-[#FFFDF5] text-[#26351F]'
                }`}
              >
                {style.icon} {style.label}
              </button>
            );
          }
        )}
      </div>

      {/* List */}
      {sortedActivities.length > 0 ? (
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {sortedActivities.map((act) => {
            const style = CATEGORY_STYLES[act.category];

            return (
              <div
                key={act.id}
                className={`p-3 rounded-2xl border-2 border-[#26351F] flex items-start gap-3 transition-all ${
                  act.completed ? 'opacity-70 line-through' : 'shadow-[2px_2px_0px_#26351F]'
                }`}
                style={{ backgroundColor: style.bg }}
              >
                <button
                  type="button"
                  onClick={() => onToggleActivity(act.id)}
                  className={`shrink-0 w-6 h-6 mt-0.5 rounded-lg border-2 border-[#26351F] flex items-center justify-center transition-all cursor-pointer ${
                    act.completed ? 'bg-[#707B3B] text-[#FFF8E7]' : 'bg-[#FFF8E7]'
                  }`}
                >
                  {act.completed && <Check size={14} className="stroke-[3.5]" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      onClick={() => onToggleActivity(act.id)}
                      className="font-body font-bold text-sm sm:text-base text-[#26351F] cursor-pointer"
                    >
                      {act.title}
                    </span>
                    <span
                      className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full border border-[#26351F]"
                      style={{ backgroundColor: style.badgeBg }}
                    >
                      {style.icon} {style.label}
                    </span>
                    <span className="text-[11px] font-display font-bold bg-[#FFFDF5] border border-[#26351F]/40 px-2 py-0.5 rounded-md text-[#26351F]/80 flex items-center gap-1">
                      <Clock size={11} /> {formatHourShort(act.startHour)} – {formatHourShort(act.endHour)}
                    </span>
                  </div>
                  {act.description && (
                    <p className="text-xs font-body font-medium text-[#26351F]/70 mt-1">
                      {act.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onEditActivity(act)}
                    className="p-1 rounded-lg border border-transparent hover:border-[#26351F] hover:bg-[#FFF8E7] text-[#26351F]"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => onDeleteActivity(act.id)}
                    className="p-1 rounded-lg border border-transparent hover:border-[#26351F] hover:bg-[#FFD9E3] text-[#26351F]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 px-4 bg-[#FFFDF5] rounded-2xl border-2 border-dashed border-[#26351F]/30">
          <p className="font-display font-bold text-sm text-[#26351F] mb-1">
            No activities matching this filter
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-2 py-1.5 px-3.5 bg-[#A8C69F] text-[#26351F] rounded-xl font-display font-bold text-xs border border-[#26351F] shadow-[1.5px_1.5px_0px_#26351F] cursor-pointer"
          >
            + Schedule an Activity
          </button>
        </div>
      )}
    </div>
  );
};
