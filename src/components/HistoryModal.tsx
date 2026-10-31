import React from 'react';
import { DayRecord } from '../types';
import { X, Calendar, CheckCircle2, Clock, Trophy, ChevronRight } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: DayRecord[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen) return null;

  const formatTracked = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26351F]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8E7] w-full max-w-lg rounded-3xl border-[3px] border-[#26351F] shadow-[6px_6px_0px_#26351F] p-6 relative max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#FFFDF5] border-2 border-[#26351F] text-[#26351F] hover:bg-[#FFD9E3] transition-all cursor-pointer shadow-[2px_2px_0px_#26351F]"
        >
          <X size={16} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#DCE9A4] border-2 border-[#26351F] flex items-center justify-center text-[#26351F] shadow-[2px_2px_0px_#26351F]">
            <Calendar size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-[#26351F]">
              Journal History
            </h3>
            <p className="text-xs font-body font-semibold text-[#26351F]/70">
              Past days of mindful productivity
            </p>
          </div>
        </div>

        {/* List of Previous Days */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {history.length > 0 ? (
            history.map((record, index) => (
              <div
                key={index}
                className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-4 shadow-[2px_2px_0px_#26351F] flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-[#26351F]">
                      {record.displayDate}
                    </span>
                  </div>
                  <span className="text-xs font-display font-bold bg-[#F5A0B7] border border-[#26351F] px-2.5 py-0.5 rounded-full text-[#26351F]">
                    {record.completionPercentage}% Done
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-body pt-1 border-t border-[#26351F]/10">
                  <div className="text-[#26351F]/80">
                    <span className="font-bold text-[#26351F]">{record.completedActivities}</span> of {record.totalActivities} tasks
                  </div>
                  <div className="text-[#26351F]/80 flex items-center gap-1">
                    <Clock size={12} />
                    <span>{record.scheduledHours}h scheduled</span>
                  </div>
                  <div className="text-right text-[#26351F]/60 text-[11px]">
                    {record.finishedAt ? `Saved ${record.finishedAt}` : ''}
                  </div>
                </div>

                {record.reflectionNote && (
                  <p className="text-xs italic text-[#26351F]/80 bg-[#EFECE1] p-2 rounded-xl border border-[#26351F]/20">
                    "{record.reflectionNote}"
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 bg-[#FFFDF5] rounded-2xl border-2 border-dashed border-[#26351F]/20">
              <Trophy size={32} className="mx-auto text-[#26351F]/40 mb-2" />
              <p className="font-display font-bold text-sm text-[#26351F]">
                No archived days yet
              </p>
              <p className="text-xs font-body text-[#26351F]/60 mt-1 max-w-xs mx-auto">
                Finish your day using the "Finish My Day" button to log today into your permanent journal.
              </p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="pt-4 border-t-2 border-[#26351F]/15 mt-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#EFECE1] hover:bg-[#FFFDF5] text-[#26351F] rounded-2xl font-display font-bold text-sm border-2 border-[#26351F] shadow-[2px_2px_0px_#26351F] transition-all cursor-pointer"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
