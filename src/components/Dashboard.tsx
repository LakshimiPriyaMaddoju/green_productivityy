import React, { useState } from 'react';
import { useProductivityStore } from '../hooks/useProductivityStore';
import { ProgressTracker24 } from './ProgressTracker24';
import { Timeline24 } from './Timeline24';
import { ActivityListView } from './ActivityListView';
import { ActivityModal } from './ActivityModal';
import { EndOfDaySummary } from './EndOfDaySummary';
import { ConfirmationModal } from './ConfirmationModal';
import { HistoryModal } from './HistoryModal';
import { Activity, ActivityCategory, DayRecord } from '../types';
import {
  Calendar,
  Clock,
  RotateCcw,
  Home,
  BookOpen,
  Award,
  Plus,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

interface DashboardProps {
  onBackToLanding: () => void;
  store: ReturnType<typeof useProductivityStore>;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onBackToLanding,
  store,
}) => {
  const {
    selectedDate,
    setSelectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    isToday,
    currentHour,
    dateActivities,
    timeSlots,
    addActivity,
    editActivity,
    toggleActivity,
    deleteActivity,
    totalActivities,
    completedActivities,
    pendingActivities,
    completionPercentage,
    scheduledHours,
    unplannedHours,
    encouragingMessage,
    dayHistory,
    finishDay,
    startNewDay,
  } = store;

  // View mode tab: timeline or list
  const [activeTab, setActiveTab] = useState<'timeline' | 'list'>('timeline');

  // Activity Modal State
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [slotForNewActivity, setSlotForNewActivity] = useState<number>(currentHour || 9);

  // Modals state
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryData, setSummaryData] = useState<DayRecord | null>(null);
  const [showNewDayModal, setShowNewDayModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Format date display
  const dateParts = selectedDate.split('-');
  const dateObj = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
  const formattedDisplayDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Time-of-day greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleOpenAddModal = (hour: number = currentHour || 9) => {
    setEditingActivity(null);
    setSlotForNewActivity(hour);
    setIsActivityModalOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (
    title: string,
    startHour: number,
    endHour: number,
    category: ActivityCategory,
    description?: string
  ) => {
    if (editingActivity) {
      editActivity(editingActivity.id, title, startHour, endHour, category, description);
    } else {
      addActivity(title, startHour, endHour, category, description, selectedDate);
    }
  };

  const handleFinishDay = () => {
    const record = finishDay();
    setSummaryData(record);
    setShowSummaryModal(true);
  };

  const handleConfirmNewDay = (carryPending: boolean) => {
    startNewDay(carryPending);
  };

  return (
    <div className="min-h-screen bg-[#707B3B] text-[#26351F] flex flex-col justify-between selection:bg-[#FFE89E] selection:text-[#26351F]">
      {/* --- TOP BAR --- */}
      <header className="w-full bg-[#707B3B] border-b-2 border-[#26351F]/20 sticky top-0 z-40 backdrop-blur-md bg-[#707B3B]/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="Return to Cover Page"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFF8E7] border-2 border-[#26351F] shadow-[2px_2px_0px_#26351F] flex items-center justify-center text-[#26351F] group-hover:scale-105 transition-transform">
              <Home size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl text-[#FFF8E7] tracking-tight block leading-tight">
                Green Productivity
              </span>
              <span className="text-[11px] font-body font-semibold text-[#FFF8E7]/80 hidden sm:block">
                24-Hour Daily Planner
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation & Status Highlights */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 24 Hours Goal Badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#FFF8E7] text-[#26351F] border-2 border-[#26351F] shadow-[2px_2px_0px_#26351F] px-3 py-1.5 rounded-2xl font-display font-bold text-xs">
              <Clock size={14} className="text-[#58632C] stroke-[2.5]" />
              <span>Full 24-Hour Plan</span>
            </div>

            {/* History Archive Button */}
            <button
              onClick={() => setShowHistoryModal(true)}
              className="py-1.5 sm:py-2 px-3 sm:px-3.5 bg-[#FFF8E7] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[2.5px_2.5px_0px_#26351F] hover:bg-[#FFFDF5] hover:shadow-[3px_3px_0px_#26351F] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer"
              title="View past days archive"
            >
              <BookOpen size={15} />
              <span className="hidden sm:inline">History</span>
            </button>

            {/* New Day Button */}
            <button
              onClick={() => setShowNewDayModal(true)}
              className="py-1.5 sm:py-2 px-3 sm:px-3.5 bg-[#FFE89E] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[2.5px_2.5px_0px_#26351F] hover:bg-[#FFFDF5] hover:shadow-[3px_3px_0px_#26351F] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Start a new calendar day"
            >
              <RotateCcw size={15} />
              <span className="hidden sm:inline">New Day</span>
            </button>

            {/* Zone 3: 1 Primary Action (Finish My Day) */}
            <button
              onClick={handleFinishDay}
              className="py-1.5 sm:py-2 px-3.5 sm:px-4 bg-[#F5A0B7] text-[#26351F] rounded-2xl font-display font-bold text-xs sm:text-sm border-2 border-[#26351F] shadow-[2.5px_2.5px_0px_#26351F] hover:bg-[#FFD9E3] hover:shadow-[3.5px_3.5px_0px_#26351F] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Award size={16} />
              <span>Finish My Day</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT VIEWPORT --- */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* WARM GREETING BANNER & DATE NAVIGATION */}
        <div className="bg-[#FFF8E7] rounded-3xl p-5 sm:p-7 border-[3px] border-[#26351F] shadow-[5px_5px_0px_#26351F] mb-6 sm:mb-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Greeting & Description */}
            <div>
              <div className="flex items-center gap-2 text-xs font-display font-bold text-[#58632C] uppercase tracking-wider mb-1 flex-wrap">
                <Calendar size={14} className="stroke-[2.5]" />
                <span>{formattedDisplayDate}</span>
                <span className="opacity-40">•</span>
                <span>{getGreeting()}</span>
                {isToday && (
                  <span className="bg-[#DCE9A4] border border-[#26351F] px-2 py-0.5 rounded-full text-[#26351F] text-[10px]">
                    Today
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#26351F] tracking-tight">
                Hello! Let's make today productive 🌿
              </h1>
              <p className="font-body font-medium text-sm sm:text-base text-[#26351F]/80 mt-1 max-w-2xl text-balance">
                Plan your complete 24 hours from 12 AM to 11 PM, organize study, work, health, and personal goals.
              </p>
            </div>

            {/* Right: Date Navigator Controls & Quick Add Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* Calendar Date Navigation Controls */}
              <div className="flex items-center bg-[#FFFDF5] border-2 border-[#26351F] rounded-2xl p-1 shadow-[2px_2px_0px_#26351F]">
                <button
                  onClick={goToPreviousDay}
                  className="p-2 rounded-xl hover:bg-[#EFECE1] text-[#26351F] transition-colors cursor-pointer"
                  title="Previous Day"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={goToToday}
                  className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-colors cursor-pointer ${
                    isToday ? 'bg-[#26351F] text-[#FFF8E7]' : 'text-[#26351F] hover:bg-[#EFECE1]'
                  }`}
                  title="Jump to Today"
                >
                  Today
                </button>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2 py-1 text-xs font-display font-bold text-[#26351F] bg-transparent focus:outline-none cursor-pointer"
                />
                <button
                  onClick={goToNextDay}
                  className="p-2 rounded-xl hover:bg-[#EFECE1] text-[#26351F] transition-colors cursor-pointer"
                  title="Next Day"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Primary Schedule Activity Button */}
              <button
                onClick={() => handleOpenAddModal(currentHour)}
                className="py-3 px-5 bg-[#A8C69F] text-[#26351F] rounded-2xl font-display font-bold text-sm border-2 border-[#26351F] shadow-[3px_3px_0px_#26351F] hover:shadow-[4px_4px_0px_#26351F] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#26351F] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Plus size={18} className="stroke-[3]" />
                <span>Add Activity</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- 2-COLUMN BALANCED WORKSPACE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT COLUMN: 24-Hour Progress & Overview (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. 24-Hour Progress Tracker */}
            <ProgressTracker24
              totalActivities={totalActivities}
              completedActivities={completedActivities}
              pendingActivities={pendingActivities}
              completionPercentage={completionPercentage}
              scheduledHours={scheduledHours}
              unplannedHours={unplannedHours}
              encouragingMessage={encouragingMessage}
            />

            {/* Quick View Mode Switcher */}
            <div className="bg-[#FFF8E7] rounded-3xl p-4 border-[2.5px] border-[#26351F] shadow-[3px_3px_0px_#26351F] flex items-center justify-between">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-[#26351F]/80">
                Planner View Mode:
              </span>
              <div className="flex items-center gap-1.5 bg-[#EFECE1] p-1 rounded-2xl border-2 border-[#26351F]">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'timeline'
                      ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                      : 'text-[#26351F] hover:bg-[#FFFDF5]'
                  }`}
                >
                  <Clock size={13} />
                  <span>24h Timeline</span>
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'list'
                      ? 'bg-[#26351F] text-[#FFF8E7] shadow-[1px_1px_0px_#26351F]'
                      : 'text-[#26351F] hover:bg-[#FFFDF5]'
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>Tasks List</span>
                </button>
              </div>
            </div>

            {/* If in timeline mode, show the companion list below for quick scannability */}
            {activeTab === 'timeline' && (
              <ActivityListView
                activities={dateActivities}
                onToggleActivity={toggleActivity}
                onEditActivity={handleEditActivity}
                onDeleteActivity={deleteActivity}
                onOpenAddModal={() => handleOpenAddModal(currentHour)}
                currentHour={currentHour}
              />
            )}
          </div>

          {/* RIGHT COLUMN: 24-Hour Vertical Timeline or Detailed List (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            {activeTab === 'timeline' ? (
              <Timeline24
                timeSlots={timeSlots}
                onToggleActivity={toggleActivity}
                onEditActivity={handleEditActivity}
                onDeleteActivity={deleteActivity}
                onAddActivityInSlot={handleOpenAddModal}
                isToday={isToday}
                currentHour={currentHour}
              />
            ) : (
              <ActivityListView
                activities={dateActivities}
                onToggleActivity={toggleActivity}
                onEditActivity={handleEditActivity}
                onDeleteActivity={deleteActivity}
                onOpenAddModal={() => handleOpenAddModal(currentHour)}
                currentHour={currentHour}
              />
            )}
          </div>
        </div>
      </main>

      {/* --- DASHBOARD FOOTER --- */}
      <footer className="w-full text-center py-6 border-t-2 border-[#26351F]/20 mt-8">
        <p className="text-xs sm:text-sm font-body font-semibold text-[#FFF8E7]/90 tracking-wide">
          Green Productivity • A complete 24-hour daily to-do list with end-of-day progress tracking 🌿
        </p>
      </footer>

      {/* --- MODALS --- */}
      {/* 1. Add / Edit Activity Modal */}
      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => {
          setIsActivityModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        initialActivity={editingActivity}
        defaultStartHour={slotForNewActivity}
      />

      {/* 2. End of Day Summary Modal */}
      {showSummaryModal && summaryData && (
        <EndOfDaySummary
          summary={summaryData}
          onClose={() => setShowSummaryModal(false)}
          onStartNewDay={() => {
            setShowSummaryModal(false);
            setShowNewDayModal(true);
          }}
        />
      )}

      {/* 3. Start New Day Confirmation Modal */}
      <ConfirmationModal
        isOpen={showNewDayModal}
        onClose={() => setShowNewDayModal(false)}
        onConfirm={handleConfirmNewDay}
        pendingCount={pendingActivities}
      />

      {/* 4. Journal History Archive Modal */}
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        history={dayHistory}
      />
    </div>
  );
};
