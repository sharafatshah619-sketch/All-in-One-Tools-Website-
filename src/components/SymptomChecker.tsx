import React, { useState } from 'react';
import { SYMPTOMS_LIST, NUTRIENTS } from '../data/nutritionData';
import { UserProfile, DietType, Gender, DeficiencyAnalysisResult } from '../types';
import { analyzeSymptoms } from '../utils/checkerLogic';

interface Props {
  onGoToFoodGuide: (nutrientId?: string) => void;
  onGoToDoctorChecklist: (selectedSymptoms: string[]) => void;
}

export const SymptomChecker: React.FC<Props> = ({ onGoToFoodGuide, onGoToDoctorChecklist }) => {
  // Step state: 1 = Profile & Context, 2 = Select Symptoms, 3 = Results
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // User Profile
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    gender: 'unspecified',
    diet: 'mixed',
    outdoorSunlight: 'moderate',
    notes: ''
  });

  // Selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Results state
  const [results, setResults] = useState<DeficiencyAnalysisResult[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRunAnalysis = () => {
    if (selectedSymptoms.length === 0) return;
    const analysis = analyzeSymptoms(selectedSymptoms, profile);
    setResults(analysis);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setSelectedSymptoms([]);
    setResults([]);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Highlight helper for real-time search matches
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const trimmed = query.trim();
    const regex = new RegExp(`(${trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-100 text-amber-950 font-bold px-0.5 rounded-xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Enhanced real-time filtered symptoms
  const filteredSymptoms = SYMPTOMS_LIST.filter(symptom => {
    const query = searchFilter.trim().toLowerCase();
    const matchesCategory = activeCategory === 'all' || symptom.category === activeCategory;

    if (!query) return matchesCategory;

    const matchesName = symptom.name.toLowerCase().includes(query);
    const matchesDesc = symptom.simpleDescription.toLowerCase().includes(query);
    const matchesCat = symptom.category.toLowerCase().includes(query);
    
    // Check if query matches any linked nutrient name or ID (e.g., "iron", "vitamin d", "b12")
    const matchesNutrients = symptom.associatedNutrients.some(nId => {
      const nut = NUTRIENTS[nId];
      if (!nut) return false;
      return nut.name.toLowerCase().includes(query) || nut.id.toLowerCase().includes(query);
    });

    return (matchesName || matchesDesc || matchesCat || matchesNutrients) && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Steps Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              step === 1 ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 1 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}>1</span>
            <span>About You</span>
          </button>
          
          <div className="w-8 sm:w-16 h-0.5 bg-slate-200" />

          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              step === 2 ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}>2</span>
            <span>Symptoms ({selectedSymptoms.length})</span>
          </button>

          <div className="w-8 sm:w-16 h-0.5 bg-slate-200" />

          <button
            onClick={() => {
              if (selectedSymptoms.length > 0) handleRunAnalysis();
            }}
            disabled={selectedSymptoms.length === 0}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              step === 3 ? 'text-teal-700' : selectedSymptoms.length > 0 ? 'text-slate-400 hover:text-slate-600' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>3</span>
            <span>Results</span>
          </button>
        </div>
      </div>

      {/* STEP 1: USER INFORMATION */}
      {step === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-bold mb-2">
              <span>👤 Step 1 of 3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Basic Information</h2>
            <p className="text-sm text-slate-600 mt-1">
              Your age, diet, and lifestyle affect how your body absorbs vitamins and iron. All answers stay private on your device.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                🎂 Age in Years
              </label>
              <input
                type="number"
                min="1"
                max="120"
                placeholder="e.g. 28"
                value={profile.age}
                onChange={e => setProfile({ ...profile, age: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">Helps evaluate age-related absorption differences (e.g., Vitamin D or B12).</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                🚻 Gender (Optional)
              </label>
              <select
                value={profile.gender}
                onChange={e => setProfile({ ...profile, gender: e.target.value as Gender })}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm"
              >
                <option value="unspecified">Prefer not to say / General</option>
                <option value="female">Female (Higher monthly iron needs)</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Women of reproductive age often need higher iron due to menstrual loss.</p>
            </div>

            {/* Dietary Habits */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                🥗 Typical Dietary Habits
              </label>
              <select
                value={profile.diet}
                onChange={e => setProfile({ ...profile, diet: e.target.value as DietType })}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm"
              >
                <option value="mixed">Mixed diet (Eats meat, fish, eggs, and plants)</option>
                <option value="vegetarian">Vegetarian (Eats dairy and eggs, but no meat/fish)</option>
                <option value="vegan">Strict Vegan (100% plant foods, no dairy or eggs)</option>
                <option value="low_dairy">Low or No Dairy (Rarely consumes milk or curd)</option>
                <option value="low_fruits_veg">Low Fresh Produce (Rarely eats fresh fruits or greens)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Vitamin B12 is found primarily in animal products; Folate and Vitamin C in fresh plants.</p>
            </div>

            {/* Sunlight Exposure */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                ☀️ Outdoor Sunlight Exposure
              </label>
              <select
                value={profile.outdoorSunlight}
                onChange={e => setProfile({ ...profile, outdoorSunlight: e.target.value as 'low' | 'moderate' | 'high' })}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm"
              >
                <option value="low">Low (Mostly indoors, rarely in direct sunlight)</option>
                <option value="moderate">Moderate (About 15 to 30 mins outside daily)</option>
                <option value="high">High (Spends significant time working or outdoors)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">The human body synthesizes Vitamin D naturally when midday sun hits unprotected skin.</p>
            </div>
          </div>

          {/* Real-time search jump box */}
          <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <span className="text-2xl select-none">🔍</span>
              <div>
                <p className="text-xs font-bold text-teal-950">Looking to check a specific symptom right away?</p>
                <p className="text-[11px] text-teal-800">You can jump straight into real-time search now.</p>
              </div>
            </div>
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Type symptom (e.g. hair, tired, cramps)..."
                value={searchFilter}
                onChange={e => {
                  setSearchFilter(e.target.value);
                  setStep(2);
                }}
                className="w-full px-3.5 py-2 bg-white border border-teal-300 rounded-lg text-slate-900 text-xs focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-base shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Next: Select Your Symptoms</span>
              <span>➡️</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SYMPTOM SELECTION */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-bold mb-2">
                <span>🩺 Step 2 of 3</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What Symptoms Are You Experiencing?</h2>
              <p className="text-sm text-slate-600 mt-1">
                Tap all the cards that describe how your body has been feeling lately.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-teal-100 text-teal-900 font-bold px-3 py-1.5 rounded-full">
                {selectedSymptoms.length} selected
              </span>
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={() => setSelectedSymptoms([])}
                  className="text-xs text-red-600 hover:underline px-2 py-1"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Real-Time Search Bar & Category Controls */}
          <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
            {/* Search Input Box */}
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-lg select-none">🔍</span>
              <input
                type="text"
                placeholder="Search symptoms or nutrients in real time (e.g. fatigue, hair, cramps, iron, b12, vision)..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm font-medium transition-all shadow-2xs"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-2.5 px-2 py-1 text-xs text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  title="Clear search"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Quick Search Suggestions Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
              <span className="font-bold text-slate-500 whitespace-nowrap text-[11px] uppercase tracking-wider mr-1">
                Quick Picks:
              </span>
              {[
                { label: '⚡ Fatigue', query: 'tired' },
                { label: '💇 Hair Fall', query: 'hair' },
                { label: '🩸 Iron / Anemia', query: 'iron' },
                { label: '☀️ Vitamin D', query: 'vitamin d' },
                { label: '🥩 Vitamin B12', query: 'b12' },
                { label: '🦵 Cramps', query: 'cramps' },
                { label: '🦴 Bone Pain', query: 'bone' },
                { label: '👄 Mouth Sores', query: 'mouth' },
                { label: '🤲 Tingling', query: 'tingling' },
                { label: '👁️ Night Vision', query: 'vision' },
              ].map(chip => (
                <button
                  key={chip.query}
                  type="button"
                  onClick={() => setSearchFilter(searchFilter.toLowerCase() === chip.query ? '' : chip.query)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap border transition-all text-xs ${
                    searchFilter.toLowerCase() === chip.query
                      ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Category Filter Buttons & Results Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'energy', label: '⚡ Energy' },
                  { id: 'skin_hair', label: '💇 Skin & Hair' },
                  { id: 'muscles_bones', label: '🦵 Muscles & Bones' },
                  { id: 'nerves_brain', label: '🧠 Nerves & Mood' },
                  { id: 'immunity_vision', label: '🛡️ Immunity & Eyes' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Real-time search status and bulk action */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {filteredSymptoms.length} of {SYMPTOMS_LIST.length} symptoms
                </span>

                {searchFilter && filteredSymptoms.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const allFilteredIds = filteredSymptoms.map(s => s.id);
                      const allSelected = allFilteredIds.every(id => selectedSymptoms.includes(id));
                      if (allSelected) {
                        setSelectedSymptoms(prev => prev.filter(id => !allFilteredIds.includes(id)));
                      } else {
                        setSelectedSymptoms(prev => Array.from(new Set([...prev, ...allFilteredIds])));
                      }
                    }}
                    className="text-xs font-bold text-teal-800 hover:text-teal-900 bg-teal-100/80 hover:bg-teal-200/80 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {filteredSymptoms.every(s => selectedSymptoms.includes(s.id))
                      ? 'Deselect matching'
                      : `+ Select all ${filteredSymptoms.length} results`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Symptom Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredSymptoms.map(symptom => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              
              // Check if matched via linked nutrient
              const query = searchFilter.trim().toLowerCase();
              const matchedNutrient = query
                ? symptom.associatedNutrients.find(nId => {
                    const nut = NUTRIENTS[nId];
                    return nut && (nut.name.toLowerCase().includes(query) || nut.id.toLowerCase().includes(query));
                  })
                : null;

              return (
                <button
                  key={symptom.id}
                  type="button"
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl select-none" role="img" aria-label={symptom.name}>
                        {symptom.emoji}
                      </span>
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        ✓
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {highlightMatch(symptom.name, searchFilter)}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {highlightMatch(symptom.simpleDescription, searchFilter)}
                    </p>

                    {matchedNutrient && (
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md text-[10px] font-bold">
                          <span>✨ Linked to:</span>
                          <span>{NUTRIENTS[matchedNutrient]?.name}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className={isSelected ? 'font-bold text-teal-700' : ''}>
                      {isSelected ? '✓ Selected' : 'Tap to select'}
                    </span>
                    <span className="font-medium text-slate-400">
                      {symptom.associatedNutrients.length} possible links
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredSymptoms.length === 0 && (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <span className="text-3xl">🔍</span>
              <p className="text-sm font-semibold text-slate-700 mt-2">No symptoms found matching "{searchFilter}"</p>
              <button
                onClick={() => { setSearchFilter(''); setActiveCategory('all'); }}
                className="mt-3 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50"
            >
              ⬅️ Back to Information
            </button>

            <button
              onClick={handleRunAnalysis}
              disabled={selectedSymptoms.length === 0}
              className={`w-full sm:w-auto px-8 py-3.5 font-bold rounded-xl text-base shadow-sm transition-all flex items-center justify-center gap-2 ${
                selectedSymptoms.length > 0
                  ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Analyze {selectedSymptoms.length} Selected Symptoms</span>
              <span>🔍</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: RESULTS PAGE */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Results Header Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-bold mb-2">
                  <span>📊 Step 3 of 3: Educational Findings</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Your Nutritional Symptom Analysis</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Based on your selected symptoms and dietary habits, here are potential vitamins and minerals that might be involved.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-lg"
                >
                  ✏️ Edit Symptoms
                </button>
                <button
                  onClick={resetAll}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg"
                >
                  🔄 Start Over
                </button>
              </div>
            </div>

            {/* Selected Symptoms Recap */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Selected Symptoms ({selectedSymptoms.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(id => {
                  const s = SYMPTOMS_LIST.find(item => item.id === id);
                  if (!s) return null;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 shadow-2xs"
                    >
                      <span>{s.emoji}</span>
                      <span>{s.name}</span>
                    </span>
                  );
                })}
              </div>

              {profile.diet !== 'mixed' && (
                <p className="text-xs text-blue-700 mt-3 pt-2 border-t border-slate-200">
                  ℹ️ Dietary pattern noted: <strong className="capitalize">{profile.diet.replace('_', ' ')}</strong>. Sun exposure: <strong className="capitalize">{profile.outdoorSunlight}</strong>.
                </p>
              )}
            </div>

            {/* Distinction between Vitamins and Minerals Alert */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <div className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">
                    Important Medical Distinction: Vitamins vs Minerals
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Vitamins (like Vitamin D, B12, C, A, Folate) are organic compounds made by plants or animals. 
                    <strong> Iron is an essential mineral</strong>, not a vitamin. We clearly label each nutrient below so you understand how they work differently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Cards List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 px-1">
              Possible Nutritional Associations ({results.length})
            </h3>

            {results.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                <span className="text-4xl">🤔</span>
                <p className="text-base font-semibold text-slate-800 mt-2">No direct nutritional patterns found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  The symptoms you selected might relate to everyday stress, sleep deficiency, dehydration, or general non-nutritional conditions.
                </p>
              </div>
            ) : (
              results.map((res, index) => {
                const { nutrient, matchedSymptoms, relevanceLevel, dietRiskFactor } = res;
                const isMineral = nutrient.category === 'mineral';

                const badgeColors = {
                  'Strong match': 'bg-red-50 text-red-700 border-red-200',
                  'Moderate match': 'bg-amber-50 text-amber-700 border-amber-200',
                  'Possible match': 'bg-blue-50 text-blue-700 border-blue-200'
                };

                return (
                  <div
                    key={nutrient.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none" role="img" aria-label={nutrient.name}>
                          {nutrient.emoji}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-slate-900">{nutrient.name}</h4>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                              isMineral ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800'
                            }`}>
                              {isMineral ? 'Mineral' : 'Vitamin'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{nutrient.simpleRole}</p>
                        </div>
                      </div>

                      <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold border ${badgeColors[relevanceLevel]}`}>
                        {relevanceLevel} ({matchedSymptoms.length} symptoms)
                      </span>
                    </div>

                    {/* Matched Symptoms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                          Matched Symptoms in your report:
                        </p>
                        <ul className="space-y-1">
                          {matchedSymptoms.map(s => (
                            <li key={s.id} className="flex items-center gap-1.5 text-slate-700">
                              <span>{s.emoji}</span>
                              <span className="font-medium">{s.name}</span>
                            </li>
                          ))}
                        </ul>

                        {dietRiskFactor && (
                          <div className="mt-2 pt-2 border-t border-slate-200 text-amber-900 font-medium">
                            ⚠️ {dietRiskFactor}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                        <p className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
                          Affordable Natural Food Sources:
                        </p>
                        <ul className="space-y-1 text-emerald-800">
                          {nutrient.affordableFoods.map((food, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1">
                              <span>•</span>
                              <span>{food}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Medical Test to Discuss & Absorption Tip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                        <p className="font-bold text-blue-900 mb-1">🩸 Recommended Blood Test:</p>
                        <p className="text-blue-800">{nutrient.recommendedBloodTest}</p>
                        <p className="text-[11px] text-blue-600 mt-1">Ask your doctor to order this test to check actual cellular levels.</p>
                      </div>

                      <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-100">
                        <p className="font-bold text-amber-900 mb-1">⚡ Absorption Tip:</p>
                        <p className="text-amber-800">{nutrient.absorptionTip}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Actionable Next Steps & Safety Guidelines */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              🏥 Recommended Next Steps & Medical Safety
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="text-2xl">1️⃣</span>
                <h4 className="font-bold text-slate-900 text-sm">Do Not Self-Prescribe</h4>
                <p className="text-slate-600 leading-relaxed">
                  Avoid starting high-dose supplements on your own. High levels of fat-soluble vitamins (such as Vitamin A or D) or Iron can build up to toxic levels if your body doesn't need them.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="text-2xl">2️⃣</span>
                <h4 className="font-bold text-slate-900 text-sm">Confirm with Blood Tests</h4>
                <p className="text-slate-600 leading-relaxed">
                  Deficiencies can only be confirmed by a clinical blood test. Ask your physician for a Complete Blood Count (CBC), Ferritin, Vitamin D 25-OH, and Vitamin B12.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="text-2xl">3️⃣</span>
                <h4 className="font-bold text-slate-900 text-sm">Focus on Real Foods First</h4>
                <p className="text-slate-600 leading-relaxed">
                  Start incorporating eggs, yogurt, lentils, spinach, and seasonal fruits into your daily meals. Nutrients from whole foods are safer and absorbed naturally.
                </p>
              </div>
            </div>

            {/* When to see a doctor */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-xs text-red-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🩺</span>
                <h4 className="font-bold text-sm text-red-900">When to Consult a Healthcare Professional:</h4>
              </div>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li>If your tiredness or weakness interferes with your daily ability to work or walk.</li>
                <li>If you notice numbness, tingling, or loss of sensation in your hands, feet, or legs.</li>
                <li>If you have pale skin accompanied by shortness of breath during normal walking.</li>
                <li>If mouth sores or wounds persist for longer than 2 weeks without improving.</li>
                <li>If you are pregnant, breastfeeding, or planning pregnancy.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onGoToFoodGuide()}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2"
              >
                <span>🥗 Explore Affordable Food Guide</span>
              </button>

              <button
                onClick={() => onGoToDoctorChecklist(selectedSymptoms)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2"
              >
                <span>📋 Prepare Doctor Visit Checklist</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-5 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-xl text-sm transition-colors flex items-center gap-2"
              >
                <span>🖨️ Print / Save Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
