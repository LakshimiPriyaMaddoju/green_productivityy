import React from 'react';
import { NotebookIllustration } from './NotebookIllustration';
import { ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  tasksCount?: number;
  completedCount?: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  tasksCount = 0,
  completedCount = 0,
}) => {
  return (
    <div className="min-h-screen bg-[#707B3B] text-[#26351F] flex flex-col justify-between items-center px-4 py-8 sm:py-12 md:py-14 select-none relative overflow-x-hidden">
      {/* Subtle organic background floating sparkles and leaves */}
      <div className="absolute top-10 left-8 md:left-24 text-[#F5D66E] opacity-75 pointer-events-none animate-pulse">
        <Sparkles size={28} />
      </div>
      <div className="absolute bottom-16 right-8 md:right-24 text-[#F5D66E] opacity-75 pointer-events-none animate-pulse">
        <Sparkles size={32} />
      </div>

      {/* TOP HEADER / TITLE */}
      <header className="w-full text-center max-w-xl mx-auto pt-2 md:pt-4">
        <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] font-bold tracking-tight text-[#FFF8E7] drop-shadow-[0_2px_4px_rgba(38,53,31,0.35)]">
          Green Productivity
        </h1>
      </header>

      {/* CENTER STAGE: CARTOON ILLUSTRATION IN ROUNDED FRAME */}
      <main className="w-full max-w-xl mx-auto my-6 sm:my-8 flex flex-col items-center">
        {/* Frame container matching the reference styling */}
        <div className="w-full max-w-[490px] bg-[#FFF8E7] rounded-3xl p-5 sm:p-7 md:p-8 border-[3px] border-[#26351F] shadow-[6px_6px_0px_#26351F] transition-transform duration-300 hover:scale-[1.01] relative">
          {/* Subtle top washi tape decoration for cozy stationery aesthetic */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5D66E] border-2 border-[#26351F] shadow-sm px-5 py-0.5 rounded-sm text-[11px] font-display font-bold uppercase tracking-wider text-[#26351F] rotate-[-1deg]">
            Today's Journal
          </div>

          {/* The custom cartoon notebook illustration */}
          <NotebookIllustration className="w-full" />
        </div>

        {/* Action Controls & Metadata below illustration */}
        <div className="mt-7 sm:mt-9 flex flex-col items-center w-full max-w-xs text-center space-y-4">
          {/* Large Rounded Cream START Button */}
          <button
            onClick={onStart}
            className="w-full py-3.5 sm:py-4 px-8 bg-[#FFF8E7] text-[#26351F] rounded-full text-lg sm:text-xl font-display font-bold tracking-wider uppercase border-[3px] border-[#26351F] shadow-[4px_4px_0px_#26351F] hover:bg-[#FFFDF5] hover:shadow-[5px_5px_0px_#26351F] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            aria-label="Start Green Productivity"
          >
            <span>START</span>
            <ArrowRight size={22} className="stroke-[3] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Time Specification */}
          <div className="flex items-center justify-center gap-1.5 text-[#FFF8E7] font-display font-semibold text-base sm:text-lg tracking-wide opacity-95">
            <Clock size={18} className="stroke-[2.5]" />
            <span>time: 24 hours</span>
          </div>

          {/* If user already has ongoing tasks for the day, give a gentle notice */}
          {tasksCount > 0 && (
            <div className="bg-[#58632C]/60 text-[#FFF8E7] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#FFF8E7]/40 flex items-center gap-1.5 backdrop-blur-sm animate-fade-in">
              <CheckCircle2 size={14} className="text-[#F5D66E]" />
              <span>{completedCount} of {tasksCount} tasks completed today</span>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER DESCRIPTION */}
      <footer className="w-full text-center max-w-xl mx-auto pb-2 sm:pb-4">
        <p className="text-[#FFF8E7] text-sm sm:text-base font-body font-medium tracking-wide opacity-90 px-4 text-balance">
          A daily to-do list with end-of-day progress tracking.
        </p>
      </footer>
    </div>
  );
};
