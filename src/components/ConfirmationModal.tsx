import React, { useState } from 'react';
import { AlertCircle, X, Sparkles, ArrowRight } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (carryPendingTasks: boolean) => void;
  pendingCount: number;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  pendingCount,
}) => {
  const [carryPending, setCarryPending] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26351F]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8E7] w-full max-w-md rounded-3xl border-[3px] border-[#26351F] shadow-[6px_6px_0px_#26351F] p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#FFFDF5] border-2 border-[#26351F] text-[#26351F] hover:bg-[#FFD9E3] transition-all cursor-pointer shadow-[2px_2px_0px_#26351F]"
        >
          <X size={16} />
        </button>

        {/* Modal Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE89E] border-2 border-[#26351F] flex items-center justify-center text-[#26351F] shadow-[2px_2px_0px_#26351F]">
            <Sparkles size={24} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-[#26351F]">
              Start a New Day?
            </h3>
            <p className="text-xs font-body font-semibold text-[#26351F]/70">
              Your daily progress will be safely archived
            </p>
          </div>
        </div>

        {/* Explanation Box */}
        <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-4 mb-5 text-sm font-body text-[#26351F] space-y-2 shadow-[2px_2px_0px_#26351F]">
          <p>
            Starting a new day resets your 8-hour timer and archives today's results into your journal history.
          </p>
          {pendingCount > 0 && (
            <div className="pt-2 border-t border-[#26351F]/15 flex items-center gap-2.5">
              <input
                type="checkbox"
                id="carryTasks"
                checked={carryPending}
                onChange={(e) => setCarryPending(e.target.checked)}
                className="w-5 h-5 rounded-md accent-[#707B3B] cursor-pointer"
              />
              <label htmlFor="carryTasks" className="font-body font-bold text-xs text-[#26351F] cursor-pointer">
                Carry forward {pendingCount} pending task{pendingCount > 1 ? 's' : ''} to tomorrow
              </label>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-[#FFFDF5] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:bg-[#EFECE1] hover:shadow-[4px_4px_0px_#26351F] transition-all cursor-pointer text-center"
          >
            Keep Working
          </button>
          <button
            onClick={() => {
              onConfirm(carryPending);
              onClose();
            }}
            className="flex-1 py-3 px-4 bg-[#A8C69F] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Start Fresh</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
