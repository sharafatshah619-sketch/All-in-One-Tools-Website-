import React, { useState } from 'react';
import { FOOD_DATABASE, NUTRIENTS } from '../data/nutritionData';

interface Props {
  initialNutrientFilter?: string;
}

export const FoodGuide: React.FC<Props> = ({ initialNutrientFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNutrient, setSelectedNutrient] = useState<string>(initialNutrientFilter || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Foods', emoji: '🍽️' },
    { id: 'eggs', label: 'Eggs', emoji: '🥚' },
    { id: 'dairy', label: 'Milk & Yogurt', emoji: '🥛' },
    { id: 'lentils_beans', label: 'Lentils & Beans', emoji: '🫘' },
    { id: 'leafy_veg', label: 'Spinach & Greens', emoji: '🥬' },
    { id: 'fruits', label: 'Seasonal Fruits', emoji: '🍎' },
    { id: 'fish', label: 'Fish', emoji: '🐟' },
    { id: 'meat', label: 'Poultry & Meat', emoji: '🍗' },
    { id: 'nuts_seeds', label: 'Nuts & Seeds', emoji: '🥜' },
  ];

  const nutrientOptions = [
    { id: 'all', label: 'All Nutrients' },
    { id: 'vitamin_d', label: '☀️ Vitamin D' },
    { id: 'vitamin_b12', label: '🥩 Vitamin B12' },
    { id: 'vitamin_b9', label: '🥬 Folate (B9)' },
    { id: 'vitamin_c', label: '🍊 Vitamin C' },
    { id: 'vitamin_a', label: '🥕 Vitamin A' },
    { id: 'vitamin_b1', label: '🌾 Vitamin B1' },
    { id: 'vitamin_b6', label: '🍌 Vitamin B6' },
    { id: 'iron', label: '🩸 Iron (Mineral)' },
  ];

  const filteredFoods = FOOD_DATABASE.filter(food => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const matchesNutrient = selectedNutrient === 'all' || food.richIn.includes(selectedNutrient);
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.simpleDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.affordableTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesNutrient && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-bold mb-2">
              <span>🥗 Affordable Nutrition Guide</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Budget-Friendly Whole Foods Guide</h2>
            <p className="text-sm text-slate-600 mt-1">
              You do not need expensive imported superfoods or expensive pills. Everyday grocery staples provide high amounts of essential vitamins and minerals.
            </p>
          </div>
        </div>

        {/* Smart Absorption Tips Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-emerald-900">
            <span className="font-bold block text-sm mb-1">🍋 The Iron Booster Rule:</span>
            <p>
              Always pair plant-based iron (lentils, spinach, beans) with Vitamin C (lemon juice, tomatoes, oranges). Vitamin C transforms plant iron into a form your gut absorbs up to 300% better!
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900">
            <span className="font-bold block text-sm mb-1">☕ The Tea & Coffee Rule:</span>
            <p>
              Avoid drinking hot black tea, green tea, or coffee immediately after meals. The tannins and polyphenols bind to iron and calcium, blocking their absorption. Wait at least 1 hour.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3 pt-2">
          {/* Search bar */}
          <input
            type="text"
            placeholder="🔍 Search affordable foods (e.g. egg, curd, daal, spinach, fish)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600"
          />

          {/* Category Tabs */}
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Filter by Category:</p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nutrient Filter */}
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Filter by Target Vitamin or Mineral:</p>
            <div className="flex flex-wrap gap-1.5">
              {nutrientOptions.map(nut => (
                <button
                  key={nut.id}
                  onClick={() => setSelectedNutrient(nut.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedNutrient === nut.id
                      ? 'bg-blue-700 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {nut.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFoods.map(food => (
          <div
            key={food.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl select-none" role="img" aria-label={food.name}>
                    {food.emoji}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{food.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{food.category.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {food.simpleDescription}
              </p>

              {/* Nutrients badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {food.richIn.map(nId => {
                  const nut = NUTRIENTS[nId];
                  if (!nut) return null;
                  return (
                    <span
                      key={nId}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        nut.category === 'mineral'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}
                    >
                      <span>{nut.emoji}</span>
                      <span>{nut.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">💰 Budget Grocery Tip:</span>
                <p>{food.affordableTip}</p>
              </div>

              <div className="bg-teal-50/50 p-2.5 rounded-lg border border-teal-100 text-teal-900">
                <span className="font-bold block mb-0.5">🍳 Best Way to Eat:</span>
                <p>{food.howToEat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <span className="text-4xl">🥗</span>
          <p className="text-base font-semibold text-slate-800 mt-2">No food items found matching your filters</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedNutrient('all'); setSearchQuery(''); }}
            className="mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
