import React, { useState } from 'react';
import { DailyHydrationTracker } from './DailyHydrationTracker';
import { BMICalculator } from './BMICalculator';

interface Props {
  onGoToSymptomChecker?: () => void;
}

export const HealthCalculators: React.FC<Props> = ({ onGoToSymptomChecker }) => {
  const [activeTab, setActiveTab] = useState<'hydration_tracker' | 'water_calc' | 'bmi' | 'calories' | 'habits'>('bmi');

  // Water State
  const [waterWeightKg, setWaterWeightKg] = useState<string>('65');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'intense'>('moderate');
  const [weatherCondition, setWeatherCondition] = useState<'normal' | 'hot'>('normal');

  // Calorie State
  const [calAge, setCalAge] = useState<string>('28');
  const [calGender, setCalGender] = useState<'male' | 'female'>('female');
  const [calWeight, setCalWeight] = useState<string>('65');
  const [calHeight, setCalHeight] = useState<string>('165');
  const [calActivity, setCalActivity] = useState<string>('1.375'); // light exercise

  // Daily Habits Tracker (local state)
  const [habits, setHabits] = useState<{ id: string; title: string; emoji: string; completed: boolean }[]>([
    { id: '1', title: '15 Minutes Morning Sunlight (Vitamin D)', emoji: '☀️', completed: false },
    { id: '2', title: '1 Serving of Fresh Fruit or Lemon (Vitamin C)', emoji: '🍋', completed: false },
    { id: '3', title: '1 Serving of Greens or Lentils (Iron & Folate)', emoji: '🥬', completed: false },
    { id: '4', title: 'Drink 8-10 Glasses of Water', emoji: '💧', completed: false },
    { id: '5', title: '1 Serving of Eggs, Yogurt, or Seeds (B12 & Zinc)', emoji: '🥚', completed: false },
    { id: '6', title: 'Waited 1 hour after meals before drinking tea/coffee', emoji: '☕', completed: false },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  // Water State
  const calculateWaterIntake = () => {
    const w = parseFloat(waterWeightKg) || 60;
    let baseLiters = w * 0.033; // 33ml per kg
    if (activityLevel === 'moderate') baseLiters += 0.5;
    if (activityLevel === 'intense') baseLiters += 1.0;
    if (weatherCondition === 'hot') baseLiters += 0.5;

    const roundedLiters = Math.round(baseLiters * 10) / 10;
    const glasses = Math.round((roundedLiters * 1000) / 250); // 250ml glasses
    return { liters: roundedLiters, glasses };
  };

  const waterResult = calculateWaterIntake();

  // Calculate Calories (Mifflin-St Jeor)
  const calculateCalories = () => {
    const w = parseFloat(calWeight) || 60;
    const h = parseFloat(calHeight) || 165;
    const a = parseFloat(calAge) || 28;
    const activityMult = parseFloat(calActivity) || 1.375;

    let bmr = 10 * w + 6.25 * h - 5 * a;
    if (calGender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = Math.round(bmr * activityMult);
    return {
      bmr: Math.round(bmr),
      maintenance: tdee,
      mildLoss: Math.round(tdee - 300),
      mildGain: Math.round(tdee + 300)
    };
  };

  const calorieResult = calculateCalories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-bold">
          <span>🛠️ All-in-One Daily Health Tools</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Essential Body & Wellness Calculators</h2>
        <p className="text-sm text-slate-600">
          Practical everyday tools to assess your body mass, daily hydration needs, energy requirements, and nutrition habits.
        </p>

        {/* Tool Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {[
            { id: 'hydration_tracker', label: 'Hydration Tracker', emoji: '💧' },
            { id: 'water_calc', label: 'Water Needs Calc', emoji: '🧮' },
            { id: 'bmi', label: 'BMI & Weight', emoji: '⚖️' },
            { id: 'calories', label: 'Daily Calories', emoji: '⚡' },
            { id: 'habits', label: 'Daily Routine', emoji: '✅' },
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id as any)}
              className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                activeTab === tool.id
                  ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{tool.emoji}</span>
              <span className="text-center leading-tight">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TOOL: BMI CALCULATOR */}
      {activeTab === 'bmi' && (
        <BMICalculator onGoToSymptomChecker={onGoToSymptomChecker} />
      )}

      {/* TOOL 1: HYDRATION TRACKER */}
      {activeTab === 'hydration_tracker' && (
        <DailyHydrationTracker recommendedLiters={waterResult.liters} />
      )}

      {/* TOOL 2: WATER INTAKE CALCULATOR */}
      {activeTab === 'water_calc' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧮</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Daily Water Needs Calculator</h3>
                <p className="text-xs text-slate-500">Calculate how much water your body needs based on weight & activity</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('hydration_tracker')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-center"
            >
              <span>💧 Open Live Tracker</span>
              <span>➡️</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">Body Weight (kg)</label>
              <input
                type="number"
                value={waterWeightKg}
                onChange={e => setWaterWeightKg(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">Daily Physical Activity</label>
              <select
                value={activityLevel}
                onChange={e => setActivityLevel(e.target.value as any)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600"
              >
                <option value="sedentary">Mostly Sedentary (Desk work)</option>
                <option value="moderate">Moderate (30-60 min brisk walking/chores)</option>
                <option value="intense">Intense (Heavy workout, sports, physical labor)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">Climate / Weather</label>
              <select
                value={weatherCondition}
                onChange={e => setWeatherCondition(e.target.value as any)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600"
              >
                <option value="normal">Mild / Air-Conditioned</option>
                <option value="hot">Hot, Humid, or Sunny</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase font-bold text-blue-900 tracking-wider">Recommended Daily Water Intake</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-blue-900">{waterResult.liters} Liters</span>
                <span className="text-sm font-bold text-blue-700">(~{waterResult.glasses} standard glasses)</span>
              </div>
              <p className="text-xs text-blue-800 max-w-md">
                Proper hydration helps your kidneys filter waste and ensures water-soluble vitamins (like B-complex and C) circulate freely in your bloodstream.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-2xs">
                <span className="text-3xl block mb-1">🥤</span>
                <p className="text-xs font-bold text-slate-800">1 Glass = 250 ml</p>
                <p className="text-[11px] text-slate-500">Spread evenly through day</p>
              </div>

              <button
                onClick={() => setActiveTab('hydration_tracker')}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Track My Intake Today</span>
                <span>💧</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: DAILY CALORIE ESTIMATOR */}
      {activeTab === 'calories' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="text-2xl">⚡</span>
            <h3 className="text-lg font-bold text-slate-900">Daily Calorie & Energy Estimator (BMR)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Age</label>
              <input
                type="number"
                value={calAge}
                onChange={e => setCalAge(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender</label>
              <select
                value={calGender}
                onChange={e => setCalGender(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={calWeight}
                onChange={e => setCalWeight(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={calHeight}
                onChange={e => setCalHeight(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Activity Level</label>
            <select
              value={calActivity}
              onChange={e => setCalActivity(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm"
            >
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Light (Exercise 1-3 days/week)</option>
              <option value="1.55">Moderate (Exercise 3-5 days/week)</option>
              <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-center space-y-1">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Weight Maintenance</span>
              <p className="text-3xl font-extrabold text-teal-900">{calorieResult.maintenance} kcal</p>
              <p className="text-[11px] text-teal-700">Estimated daily calories needed to maintain current weight</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-1">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Gentle Fat Loss</span>
              <p className="text-3xl font-extrabold text-blue-900">{calorieResult.mildLoss} kcal</p>
              <p className="text-[11px] text-blue-700">Modest 300 kcal deficit; ensures you still get adequate vitamins</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Basal Rate (BMR)</span>
              <p className="text-3xl font-extrabold text-slate-800">{calorieResult.bmr} kcal</p>
              <p className="text-[11px] text-slate-500">Minimum energy your body burns just staying alive at rest</p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: DAILY HABIT & VITAMIN ROUTINE TRACKER */}
      {activeTab === 'habits' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Daily Vitamin & Nutrition Habit Checklist</h3>
                <p className="text-xs text-slate-500">Tap to check off your daily healthy nutritional actions</p>
              </div>
            </div>

            <span className="text-xs font-bold bg-teal-100 text-teal-800 px-3 py-1 rounded-full self-start sm:self-center">
              {habits.filter(h => h.completed).length} of {habits.length} Done Today
            </span>
          </div>

          <div className="space-y-2.5">
            {habits.map(habit => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  habit.completed
                    ? 'border-teal-500 bg-teal-50/70'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  <span className={`text-sm font-semibold ${
                    habit.completed ? 'text-teal-900 line-through opacity-80' : 'text-slate-800'
                  }`}>
                    {habit.title}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border ${
                  habit.completed
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-slate-300 text-transparent'
                }`}>
                  ✓
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
            <span>Stored in your browser. Resets whenever you wish.</span>
            <button
              onClick={() => setHabits(prev => prev.map(h => ({ ...h, completed: false })))}
              className="text-teal-700 hover:underline font-semibold"
            >
              Reset for Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
