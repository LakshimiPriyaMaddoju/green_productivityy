import React, { useState } from 'react';
import { Sparkles, Trophy, Clock, CheckCircle2, ListTodo, X, Copy, Check, Sun, Moon } from 'lucide-react';
import { DayRecord } from '../types';

interface EndOfDaySummaryProps {
  summary: DayRecord;
  onClose: () => void;
  onStartNewDay: () => void;
}

export const EndOfDaySummary: React.FC<EndOfDaySummaryProps> = ({
  summary,
  onClose,
  onStartNewDay,
}) => {
  const [reflection, setReflection] = useState(summary.reflectionNote || '');
  const [copied, setCopied] = useState(false);

  const getCelebrationGrade = (percent: number) => {
    if (percent >= 90) return { title: '24-Hour Master of Focus! 🌟', stamp: 'PERFECT FLOW' };
    if (percent >= 70) return { title: 'Brilliant Daily Rhythm! 🌸', stamp: 'GREAT WORK' };
    if (percent >= 50) return { title: 'Solid Progress Across the Day! 🌿', stamp: 'HALFWAY THERE' };
    return { title: 'Seeds Planted for Tomorrow! 🌱', stamp: 'GOOD EFFORT' };
  };

  const grade = getCelebrationGrade(summary.completionPercentage);

  const handleCopyRecap = () => {
    const recapText = `🌿 Green Productivity 24-Hour Daily Summary (${summary.displayDate})
• Completed: ${summary.completedActivities}/${summary.totalActivities} activities (${summary.completionPercentage}%)
• Scheduled Hours: ${summary.scheduledHours}h / 24h
• Free / Unplanned Hours: ${summary.unplannedHours}h
• Status: ${grade.title}
${summary.completedActivityTitles.length > 0 ? `\nAccomplishments:\n${summary.completedActivityTitles.map((t) => `  ✓ ${t}`).join('\n')}` : ''}
${reflection ? `\nReflection: "${reflection}"` : ''}`;

    navigator.clipboard.writeText(recapText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26351F]/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8E7] w-full max-w-lg rounded-3xl border-[3px] border-[#26351F] shadow-[6px_6px_0px_#26351F] p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto">
        {/* Top ribbon */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F5A0B7] border-2 border-[#26351F] shadow-sm px-6 py-0.5 rounded-sm text-xs font-display font-bold uppercase tracking-widest text-[#26351F] rotate-[1deg]">
          Daily Celebration
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#FFFDF5] border-2 border-[#26351F] text-[#26351F] hover:bg-[#FFD9E3] transition-all cursor-pointer shadow-[2px_2px_0px_#26351F]"
          title="Close Summary"
        >
          <X size={18} />
        </button>

        {/* Header Badge */}
        <div className="text-center mt-2 mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFE89E] border-[2.5px] border-[#26351F] shadow-[3px_3px_0px_#26351F] mb-3">
            <Trophy size={32} className="text-[#58632C] stroke-[2.5]" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#26351F]">
            {grade.title}
          </h2>
          <p className="text-xs sm:text-sm font-body font-semibold text-[#26351F]/70 mt-1">
            24-Hour End-of-Day Summary • {summary.displayDate}
          </p>
        </div>

        {/* 4 Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
            <span className="text-[11px] font-display font-bold text-[#26351F]/70 block">Planned</span>
            <span className="font-display font-bold text-xl text-[#26351F] tabular-nums">
              {summary.totalActivities}
            </span>
          </div>

          <div className="bg-[#DCE9A4] border-2 border-[#26351F] rounded-2xl p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
            <span className="text-[11px] font-display font-bold text-[#26351F] block">Completed</span>
            <span className="font-display font-bold text-xl text-[#26351F] tabular-nums">
              {summary.completedActivities}
            </span>
          </div>

          <div className="bg-[#FFE89E] border-2 border-[#26351F] rounded-2xl p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
            <span className="text-[11px] font-display font-bold text-[#26351F] block">Pending</span>
            <span className="font-display font-bold text-xl text-[#26351F] tabular-nums">
              {summary.pendingActivities}
            </span>
          </div>

          <div className="bg-[#FFD9E3] border-2 border-[#26351F] rounded-2xl p-2.5 text-center shadow-[2px_2px_0px_#26351F]">
            <span className="text-[11px] font-display font-bold text-[#26351F] block">Productivity</span>
            <span className="font-display font-bold text-xl text-[#26351F] tabular-nums">
              {summary.completionPercentage}%
            </span>
          </div>
        </div>

        {/* Scheduled Hours vs Free Hours Bar */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="bg-[#F5F4EC] border-2 border-[#26351F] rounded-2xl p-3 shadow-[2px_2px_0px_#26351F] flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#DCE9A4] border border-[#26351F]">
              <Sun size={16} className="text-[#58632C]" />
            </div>
            <div>
              <span className="text-[11px] font-display font-bold text-[#26351F]/80 block">
                Scheduled Hours
              </span>
              <span className="font-display font-bold text-base text-[#26351F]">
                {summary.scheduledHours} of 24 hrs
              </span>
            </div>
          </div>

          <div className="bg-[#F5F4EC] border-2 border-[#26351F] rounded-2xl p-3 shadow-[2px_2px_0px_#26351F] flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FFE89E] border border-[#26351F]">
              <Moon size={16} className="text-[#755B00]" />
            </div>
            <div>
              <span className="text-[11px] font-display font-bold text-[#26351F]/80 block">
                Unplanned Hours
              </span>
              <span className="font-display font-bold text-base text-[#26351F]">
                {summary.unplannedHours} of 24 hrs
              </span>
            </div>
          </div>
        </div>

        {/* Completed Accomplishments Highlights */}
        {summary.completedActivityTitles.length > 0 && (
          <div className="mb-5">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#26351F]/80 mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#58632C]" /> What You Finished:
            </h4>
            <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-3 max-h-28 overflow-y-auto space-y-1.5 text-xs font-body font-semibold">
              {summary.completedActivityTitles.map((title, i) => (
                <div key={i} className="flex items-center gap-2 text-[#26351F]">
                  <span className="text-[#58632C] font-bold">✓</span>
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Reflection Note */}
        <div className="mb-6">
          <label className="font-display font-bold text-xs uppercase tracking-wider text-[#26351F]/80 mb-1.5 block">
            End of Day Thought or Reflection:
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Today I loved focusing on... Tomorrow my main intention is..."
            rows={2}
            className="w-full bg-[#FFFDF5] text-[#26351F] p-3 rounded-2xl border-2 border-[#26351F] focus:outline-none focus:ring-2 focus:ring-[#707B3B] font-body text-xs sm:text-sm font-medium resize-none"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <button
            onClick={handleCopyRecap}
            className="w-full sm:flex-1 py-3 px-4 bg-[#FFFDF5] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:bg-[#FFE89E] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied Recap!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={onStartNewDay}
            className="w-full sm:flex-1 py-3 px-4 bg-[#A8C69F] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Start Fresh Day</span>
          </button>
        </div>
      </div>
    </div>
  );
};
