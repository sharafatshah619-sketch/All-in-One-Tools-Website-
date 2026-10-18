import React, { useState, useEffect } from 'react';

interface Props {
  recommendedLiters?: number;
}

export const DailyHydrationTracker: React.FC<Props> = ({ recommendedLiters = 2.5 }) => {
  const defaultTargetMl = Math.round(recommendedLiters * 1000);

  // Initialize from localStorage or default
  const [targetMl, setTargetMl] = useState<number>(() => {
    const saved = localStorage.getItem('vitchk_water_target');
    return saved ? parseInt(saved, 10) : defaultTargetMl;
  });

  const [currentMl, setCurrentMl] = useState<number>(() => {
    const savedDate = localStorage.getItem('vitchk_water_date');
    const today = new Date().toDateString();
    if (savedDate === today) {
      const savedAmount = localStorage.getItem('vitchk_water_current');
      return savedAmount ? parseInt(savedAmount, 10) : 0;
    }
    return 0;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('vitchk_water_current', currentMl.toString());
    localStorage.setItem('vitchk_water_target', targetMl.toString());
    localStorage.setItem('vitchk_water_date', new Date().toDateString());
  }, [currentMl, targetMl]);

  // Calculations
  const percentage = Math.min(100, Math.round((currentMl / targetMl) * 100));
  const glassesDrunk = Math.round((currentMl / 250) * 10) / 10;
  const targetGlasses = Math.round(targetMl / 250);

  const addWater = (amount: number) => {
    setCurrentMl(prev => Math.max(0, prev + amount));
  };

  const resetToday = () => {
    setCurrentMl(0);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      {/* Title & Goal Settings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl shadow-2xs">
            💧
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Daily Hydration Tracker</h3>
            <p className="text-xs text-slate-500">Log your glasses of water and reach your daily target</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs text-slate-600 font-medium">Daily Goal:</span>
          <select
            value={targetMl}
            onChange={e => setTargetMl(parseInt(e.target.value, 10))}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:border-blue-600"
          >
            <option value={1500}>1.5 Liters (6 glasses)</option>
            <option value={2000}>2.0 Liters (8 glasses)</option>
            <option value={2500}>2.5 Liters (10 glasses)</option>
            <option value={3000}>3.0 Liters (12 glasses)</option>
            <option value={3500}>3.5 Liters (14 glasses)</option>
          </select>
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-bold text-blue-800 tracking-wider">Today's Total Water Intake</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-900">
                {(currentMl / 1000).toFixed(2)}
              </span>
              <span className="text-lg font-bold text-blue-700">/ {(targetMl / 1000).toFixed(1)} Liters</span>
            </div>
            <p className="text-xs text-blue-800 mt-1 font-medium">
              🥤 {glassesDrunk} of {targetGlasses} standard glasses (250 ml each)
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-900">
              {percentage}%
            </span>
            <p className="text-xs font-semibold text-blue-700">
              {percentage >= 100 ? '🎉 Goal Completed!' : `${targetMl - currentMl} ml remaining`}
            </p>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-blue-200/80 rounded-full h-5 overflow-hidden p-0.5 border border-blue-300">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                percentage >= 100 ? 'bg-teal-600' : 'bg-blue-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-blue-700">
            <span>0 L</span>
            <span>{(targetMl / 2000).toFixed(1)} L (50%)</span>
            <span>{(targetMl / 1000).toFixed(1)} L (100%)</span>
          </div>
        </div>

        {/* Visual Glass Dots indicator */}
        <div className="pt-2">
          <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2">Visual Glass Milestones:</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: targetGlasses }).map((_, index) => {
              const isFilled = currentMl >= (index + 1) * 250;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isFilled) {
                      setCurrentMl(index * 250);
                    } else {
                      setCurrentMl((index + 1) * 250);
                    }
                  }}
                  title={`Glass ${index + 1} (250 ml)`}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
                    isFilled
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <span>{isFilled ? '🥛' : '⚪'}</span>
                  <span>#{index + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Increment Buttons */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Tap to Add Water Now:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => addWater(150)}
            className="p-4 bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-slate-800"
          >
            <span className="text-2xl">☕</span>
            <span className="text-sm font-bold">+150 ml</span>
            <span className="text-[11px] text-slate-500">Small Cup</span>
          </button>

          <button
            onClick={() => addWater(250)}
            className="p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-blue-900 shadow-2xs"
          >
            <span className="text-2xl">🥤</span>
            <span className="text-sm font-bold">+250 ml</span>
            <span className="text-[11px] text-blue-700">1 Regular Glass</span>
          </button>

          <button
            onClick={() => addWater(500)}
            className="p-4 bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-slate-800"
          >
            <span className="text-2xl">🧴</span>
            <span className="text-sm font-bold">+500 ml</span>
            <span className="text-[11px] text-slate-500">1 Half-Liter Bottle</span>
          </button>

          <button
            onClick={() => addWater(750)}
            className="p-4 bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-slate-800"
          >
            <span className="text-2xl">🚰</span>
            <span className="text-sm font-bold">+750 ml</span>
            <span className="text-[11px] text-slate-500">Large Bottle</span>
          </button>
        </div>

        {/* Undo and Reset Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => addWater(-250)}
            disabled={currentMl <= 0}
            className={`px-4 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
              currentMl > 0
                ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'border-slate-200 text-slate-300 cursor-not-allowed'
            }`}
          >
            <span>↩️</span>
            <span>Subtract 1 Glass (-250 ml)</span>
          </button>

          <button
            onClick={resetToday}
            disabled={currentMl <= 0}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 ${
              currentMl > 0
                ? 'text-red-600 hover:bg-red-50'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <span>🔄</span>
            <span>Reset Today</span>
          </button>
        </div>
      </div>

      {/* Nutritional Connection Note */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3 text-xs text-teal-900">
        <span className="text-2xl">💡</span>
        <div>
          <h5 className="font-bold text-sm text-teal-900">Why Hydration Affects Vitamins</h5>
          <p className="mt-0.5 leading-relaxed text-teal-800">
            Water is essential for dissolving and transporting water-soluble nutrients like <strong>Vitamin C</strong>, <strong>Vitamin B12</strong>, <strong>Folate</strong>, and <strong>Thiamine</strong> to your body's cells. Mild dehydration can cause headaches and fatigue that closely mimic vitamin deficiency symptoms.
          </p>
        </div>
      </div>
    </div>
  );
};
