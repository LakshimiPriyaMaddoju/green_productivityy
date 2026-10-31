import React, { useState } from 'react';
import { TimerState } from '../types';
import { Play, Pause, RotateCcw, Clock, Sparkles, Bell, BellOff } from 'lucide-react';

interface ProductivityTimerProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: (customSeconds?: number) => void;
}

export const ProductivityTimer: React.FC<ProductivityTimerProps> = ({
  timerState,
  onStart,
  onPause,
  onResume,
  onReset,
}) => {
  const [chimeEnabled, setChimeEnabled] = useState(true);

  const { totalSeconds, secondsRemaining, isRunning } = timerState;

  // Format HH:MM:SS
  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Progress fraction (0 to 1) for time elapsed
  const elapsedSeconds = Math.max(0, totalSeconds - secondsRemaining);
  const timeProgressPercent = totalSeconds > 0 ? Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100)) : 0;

  // Circular progress math (circumference = 2 * PI * r)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeProgressPercent / 100) * circumference;

  return (
    <div className="bg-[#FFF8E7] rounded-3xl p-5 sm:p-6 border-[2.5px] border-[#26351F] shadow-[4px_4px_0px_#26351F]">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFE89E] border-2 border-[#26351F] flex items-center justify-center text-[#26351F]">
            <Clock size={16} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-[#26351F] leading-tight">
              Productivity Timer
            </h2>
            <p className="text-xs font-body font-semibold text-[#26351F]/70">
              Target: 8 hours of deep daily focus
            </p>
          </div>
        </div>

        {/* Chime toggle button */}
        <button
          onClick={() => setChimeEnabled(!chimeEnabled)}
          title={chimeEnabled ? 'Chime alerts enabled' : 'Chime alerts muted'}
          className="p-1.5 rounded-full bg-[#EFECE1] border-2 border-[#26351F] hover:bg-[#FFFDF5] text-[#26351F] transition-colors cursor-pointer"
        >
          {chimeEnabled ? <Bell size={15} /> : <BellOff size={15} className="opacity-50" />}
        </button>
      </div>

      {/* Main Clock Face & Circular Progress Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 my-4">
        {/* Circular Dial */}
        <div className="relative w-36 h-36 flex items-center justify-center select-none">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background Dial Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#EFECE1"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Active Progress Ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#707B3B"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {/* Center Digital Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-display font-bold text-xl sm:text-2xl text-[#26351F] tabular-nums tracking-tight">
              {formatTime(secondsRemaining)}
            </span>
            <span className="text-[11px] font-display font-semibold text-[#26351F]/70 uppercase tracking-wider">
              {isRunning ? 'FOCUSING' : secondsRemaining === 0 ? 'COMPLETED' : 'REMAINING'}
            </span>
          </div>
        </div>

        {/* Status Breakdown & Badges */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
          {/* Elapsed Progress Tag */}
          <div className="bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-2.5 px-4 shadow-[2px_2px_0px_#26351F] flex items-center justify-between sm:justify-start gap-4">
            <span className="text-xs font-display font-bold text-[#26351F]/80">Elapsed:</span>
            <span className="font-display font-bold text-sm text-[#26351F] tabular-nums">
              {formatTime(elapsedSeconds)}
            </span>
            <span className="text-xs bg-[#DCE9A4] border border-[#26351F] px-2 py-0.5 rounded-full font-bold">
              {timeProgressPercent}%
            </span>
          </div>

          {/* Quick preset selector buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onReset(8 * 3600)}
              className="flex-1 py-1 px-2.5 text-xs font-display font-bold bg-[#EFECE1] border-2 border-[#26351F] rounded-xl hover:bg-[#DCE9A4] transition-all cursor-pointer shadow-[1.5px_1.5px_0px_#26351F]"
            >
              8 Hours
            </button>
            <button
              onClick={() => onReset(4 * 3600)}
              className="flex-1 py-1 px-2.5 text-xs font-display font-bold bg-[#EFECE1] border-2 border-[#26351F] rounded-xl hover:bg-[#DCE9A4] transition-all cursor-pointer shadow-[1.5px_1.5px_0px_#26351F]"
            >
              4 Hours
            </button>
            <button
              onClick={() => onReset(25 * 60)}
              className="flex-1 py-1 px-2.5 text-xs font-display font-bold bg-[#EFECE1] border-2 border-[#26351F] rounded-xl hover:bg-[#DCE9A4] transition-all cursor-pointer shadow-[1.5px_1.5px_0px_#26351F]"
            >
              25m Sprint
            </button>
          </div>
        </div>
      </div>

      {/* Control Buttons (Start, Pause, Resume, Reset) */}
      <div className="flex items-center gap-3 pt-2">
        {!isRunning ? (
          secondsRemaining === totalSeconds ? (
            /* Initial Start button */
            <button
              onClick={onStart}
              className="flex-1 py-3 px-4 bg-[#A8C69F] text-[#26351F] rounded-2xl font-display font-bold text-sm sm:text-base border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play size={18} className="fill-[#26351F]" />
              <span>Start Timer</span>
            </button>
          ) : secondsRemaining === 0 ? (
            /* Finished day celebration */
            <div className="flex-1 py-3 px-4 bg-[#F5D66E] text-[#26351F] rounded-2xl font-display font-bold text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] text-center flex items-center justify-center gap-2">
              <Sparkles size={18} />
              <span>Goal reached! 8 hours complete</span>
            </div>
          ) : (
            /* Resume button */
            <button
              onClick={onResume}
              className="flex-1 py-3 px-4 bg-[#A8C69F] text-[#26351F] rounded-2xl font-display font-bold text-sm sm:text-base border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play size={18} className="fill-[#26351F]" />
              <span>Resume Timer</span>
            </button>
          )
        ) : (
          /* Pause button */
          <button
            onClick={onPause}
            className="flex-1 py-3 px-4 bg-[#FFE89E] text-[#26351F] rounded-2xl font-display font-bold text-sm sm:text-base border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Pause size={18} className="fill-[#26351F]" />
            <span>Pause Timer</span>
          </button>
        )}

        {/* Reset button */}
        <button
          onClick={() => onReset()}
          className="py-3 px-4 bg-[#FFFDF5] text-[#26351F] rounded-2xl font-display font-bold text-sm sm:text-base border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:bg-[#FFD9E3] hover:shadow-[4px_4px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title="Reset back to 08:00:00"
        >
          <RotateCcw size={17} />
          <span className="hidden xs:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
