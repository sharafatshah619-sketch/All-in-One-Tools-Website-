import React from 'react';

export type ActiveTab = 'checker' | 'food_guide' | 'calculators' | 'doctor_checklist';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab, onOpenEmergency }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Branding Bar */}
        <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center text-xl shadow-xs">
              🩺
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Vitamin Deficiency Symptom Checker
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                All-in-One Health Tools & Affordable Whole Foods Guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors"
            >
              <span>🚨</span>
              <span className="hidden xs:inline">Emergency Signs</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex overflow-x-auto no-scrollbar py-2 gap-1 sm:gap-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('checker')}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'checker'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>🩺</span>
            <span>Symptom Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('food_guide')}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'food_guide'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>🥗</span>
            <span>Affordable Food Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'calculators'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>🛠️</span>
            <span>All-in-One Health Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor_checklist')}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'doctor_checklist'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>📋</span>
            <span>Doctor Checklist</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
