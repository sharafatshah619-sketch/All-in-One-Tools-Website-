import React, { useState } from 'react';

interface Props {
  onGoToSymptomChecker?: () => void;
}

export const BMICalculator: React.FC<Props> = ({ onGoToSymptomChecker }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric inputs
  const [weightKg, setWeightKg] = useState<string>('65');
  const [heightCm, setHeightCm] = useState<string>('170');

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<string>('145');
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('7');

  // Calculate BMI and Healthy Weight Range
  const computeData = () => {
    let weightInKg = 0;
    let heightInM = 0;
    let bmiValue = 0;

    if (unitSystem === 'metric') {
      const w = parseFloat(weightKg);
      const h = parseFloat(heightCm);
      if (w > 0 && h > 0) {
        weightInKg = w;
        heightInM = h / 100;
        bmiValue = weightInKg / (heightInM * heightInM);
      }
    } else {
      const lbs = parseFloat(weightLbs);
      const ft = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = ft * 12 + inches;
      if (lbs > 0 && totalInches > 0) {
        bmiValue = (lbs / (totalInches * totalInches)) * 703;
        heightInM = (totalInches * 2.54) / 100;
        weightInKg = lbs * 0.453592;
      }
    }

    if (bmiValue <= 0 || isNaN(bmiValue)) return null;

    const roundedBmi = Math.round(bmiValue * 10) / 10;

    // Ideal healthy weight range for this height (BMI 18.5 to 24.9)
    const minHealthyKg = Math.round(18.5 * heightInM * heightInM * 10) / 10;
    const maxHealthyKg = Math.round(24.9 * heightInM * heightInM * 10) / 10;
    const minHealthyLbs = Math.round(minHealthyKg * 2.20462);
    const maxHealthyLbs = Math.round(maxHealthyKg * 2.20462);

    return {
      bmi: roundedBmi,
      minHealthyKg,
      maxHealthyKg,
      minHealthyLbs,
      maxHealthyLbs
    };
  };

  const data = computeData();

  // Category classification and health explanations
  const getCategoryDetails = (bmi: number) => {
    if (bmi < 18.5) {
      return {
        category: 'Underweight',
        colorBadge: 'bg-blue-100 text-blue-800 border-blue-300',
        barColor: 'bg-blue-500',
        markerPosition: Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)),
        summary: 'Your body weight is below the standard recommended range for your height.',
        healthImplications: [
          'Higher likelihood of nutritional deficiencies (such as Iron deficiency anemia, Vitamin B12, or Folate).',
          'Potential for lowered bone mineral density (increased need for Vitamin D & Calcium).',
          'Possible lower immunity or feeling tired and cold frequently.'
        ],
        actionAdvice: 'Focus on nutrient-dense meals containing eggs, whole milk, curd, nuts, lentils, and healthy fats. Discuss with a doctor if you struggle to maintain weight.'
      };
    } else if (bmi <= 24.9) {
      return {
        category: 'Healthy Normal Weight',
        colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        barColor: 'bg-emerald-600',
        markerPosition: Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)),
        summary: 'Your body weight falls within the medically optimal healthy range for your height.',
        healthImplications: [
          'Lower statistical risk of chronic cardiovascular issues and type 2 diabetes.',
          'Normal nutrient absorption environment for both fat-soluble and water-soluble vitamins.',
          'Good foundational physical vitality.'
        ],
        actionAdvice: 'Maintain your healthy balance by eating a varied rainbow diet (greens, fresh fruit, legumes) and drinking 8-10 glasses of water daily.'
      };
    } else if (bmi <= 29.9) {
      return {
        category: 'Overweight Range',
        colorBadge: 'bg-amber-100 text-amber-800 border-amber-300',
        barColor: 'bg-amber-500',
        markerPosition: Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)),
        summary: 'Your body weight is slightly above the standard healthy range for your height.',
        healthImplications: [
          'Mildly elevated strain on joints, knees, and cardiovascular system.',
          'Possible reduced bioavailability of Vitamin D (fat-soluble Vitamin D can become trapped in fat tissue).',
          'Risk of developing insulin resistance if physical activity is very low.'
        ],
        actionAdvice: 'Incorporate 30 minutes of daily brisk walking and replace sugary snacks with fresh fruits, raw carrots, and roasted chickpeas.'
      };
    } else {
      return {
        category: 'Obesity Range',
        colorBadge: 'bg-red-100 text-red-800 border-red-300',
        barColor: 'bg-red-600',
        markerPosition: Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)),
        summary: 'Your body weight is significantly above the standard healthy reference range for your height.',
        healthImplications: [
          'Higher risk of hypertension, fatty liver, sleep apnea, and joint discomfort.',
          'Research frequently finds lower circulating blood levels of Vitamin D despite adequate dietary intake.',
          'Increased systemic inflammation.'
        ],
        actionAdvice: 'Seek supportive medical evaluation and guidance from a registered healthcare professional or dietitian for gradual, sustainable nutrition planning.'
      };
    }
  };

  const categoryDetails = data ? getCategoryDetails(data.bmi) : null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      {/* Title & Units Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl shadow-2xs">
            ⚖️
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Body Mass Index (BMI) Calculator</h3>
            <p className="text-xs text-slate-500">Assess your body weight category and healthy weight range</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-center border border-slate-200">
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              unitSystem === 'metric' ? 'bg-white text-teal-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (kg / cm)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              unitSystem === 'imperial' ? 'bg-white text-teal-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (lbs / ft)
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/60 p-5 rounded-2xl border border-slate-200">
        {unitSystem === 'metric' ? (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                ⚖️ Weight in Kilograms (kg)
              </label>
              <input
                type="number"
                min="20"
                max="300"
                step="0.5"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="e.g. 68"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Your current total weight in kg</span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                📏 Height in Centimeters (cm)
              </label>
              <input
                type="number"
                min="50"
                max="250"
                value={heightCm}
                onChange={e => setHeightCm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="e.g. 172"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">1 meter = 100 cm (e.g. 5'7" ≈ 170 cm)</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                ⚖️ Weight in Pounds (lbs)
              </label>
              <input
                type="number"
                min="40"
                max="650"
                step="0.5"
                value={weightLbs}
                onChange={e => setWeightLbs(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="e.g. 150"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Your current weight in lbs</span>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-800 mb-1">
                📏 Height (Feet & Inches)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      min="2"
                      max="8"
                      value={heightFeet}
                      onChange={e => setHeightFeet(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600"
                      placeholder="5"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-400 font-bold">ft</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={e => setHeightInches(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:border-teal-600"
                      placeholder="8"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-400 font-bold">in</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 block">Feet and inches</span>
            </div>
          </>
        )}
      </div>

      {/* Result Display Section */}
      {data && categoryDetails && (
        <div className="space-y-6">
          {/* Main Score Box */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                  Your Calculated Body Mass Index (BMI)
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                    {data.bmi}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">kg/m²</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryDetails.colorBadge}`}>
                    {categoryDetails.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 max-w-lg leading-relaxed">
                  {categoryDetails.summary}
                </p>
              </div>

              {/* Ideal weight range for height */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1 sm:text-right shadow-2xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider block text-[11px]">
                  🎯 Healthy Weight for Your Height:
                </span>
                <p className="text-base font-extrabold text-teal-800">
                  {unitSystem === 'metric'
                    ? `${data.minHealthyKg} – ${data.maxHealthyKg} kg`
                    : `${data.minHealthyLbs} – ${data.maxHealthyLbs} lbs`}
                </p>
                <p className="text-[11px] text-slate-400">Represents standard BMI 18.5 – 24.9</p>
              </div>
            </div>

            {/* Visual Color-Coded BMI Scale Bar */}
            <div className="space-y-2 pt-2">
              <div className="relative pt-6 pb-2">
                {/* Pointer for current BMI */}
                <div
                  className="absolute top-0 -ml-3 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${categoryDetails.markerPosition}%` }}
                >
                  <span className="text-xs font-extrabold text-slate-900 bg-white px-1.5 py-0.5 rounded shadow-xs border border-slate-300">
                    {data.bmi}
                  </span>
                  <span className="text-xs leading-none text-slate-800">▼</span>
                </div>

                {/* The 4-segment colored track */}
                <div className="h-4 rounded-full flex overflow-hidden border border-slate-300 shadow-inner">
                  <div className="bg-blue-400 h-full" style={{ width: '23%' }} title="Underweight (< 18.5)" />
                  <div className="bg-emerald-500 h-full" style={{ width: '23%' }} title="Normal (18.5 - 24.9)" />
                  <div className="bg-amber-400 h-full" style={{ width: '18%' }} title="Overweight (25 - 29.9)" />
                  <div className="bg-red-500 h-full" style={{ width: '36%' }} title="Obesity (30.0+)" />
                </div>
              </div>

              {/* Scale Labels */}
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 px-1">
                <span className="text-blue-600">Underweight (&lt;18.5)</span>
                <span className="text-emerald-700">Healthy (18.5–24.9)</span>
                <span className="text-amber-600">Overweight (25–29.9)</span>
                <span className="text-red-600">Obesity (30+)</span>
              </div>
            </div>
          </div>

          {/* Actionable Health & Nutrition Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🩺</span>
                <h4 className="font-bold text-slate-900 text-sm">Health & Vitamin Considerations</h4>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                {categoryDetails.healthImplications.map((imp, idx) => (
                  <li key={idx} className="leading-relaxed">{imp}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🥗</span>
                <h4 className="font-bold text-teal-900 text-sm">Practical Daily Nutrition Action</h4>
              </div>
              <p className="text-teal-800 leading-relaxed">
                {categoryDetails.actionAdvice}
              </p>
              {onGoToSymptomChecker && (
                <button
                  type="button"
                  onClick={onGoToSymptomChecker}
                  className="mt-2 text-xs font-bold text-teal-800 hover:text-teal-900 underline flex items-center gap-1"
                >
                  <span>Check if you have any vitamin deficiency symptoms</span>
                  <span>➡️</span>
                </button>
              )}
            </div>
          </div>

          {/* All Health Status Categories Reference Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Standard World Health Organization (WHO) BMI Categories
              </h4>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-3 p-3 items-center bg-blue-50/40">
                <span className="font-bold text-blue-800">Underweight</span>
                <span className="text-slate-600">&lt; 18.5</span>
                <span className="text-slate-500">Increased risk of anemia & bone mass loss</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center bg-emerald-50/40">
                <span className="font-bold text-emerald-800">Normal Healthy Weight</span>
                <span className="text-slate-600">18.5 – 24.9</span>
                <span className="text-slate-500">Lowest risk for chronic metabolic illnesses</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center bg-amber-50/40">
                <span className="font-bold text-amber-800">Overweight</span>
                <span className="text-slate-600">25.0 – 29.9</span>
                <span className="text-slate-500">Moderate risk; increased joint load</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center bg-red-50/40">
                <span className="font-bold text-red-800">Obesity</span>
                <span className="text-slate-600">30.0 and above</span>
                <span className="text-slate-500">High risk; frequent low Vitamin D bioavailability</span>
              </div>
            </div>
          </div>

          {/* Important Medical Limitation of BMI */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">ℹ️ Medical Note on BMI Limitations:</span>
            <p>
              BMI is a general screening indicator based on height and weight. It does not measure body fat directly and cannot distinguish between dense muscle mass and adipose tissue (athletes often have a high BMI with low body fat). Always consult a doctor who can evaluate blood pressure, blood glucose, cholesterol, and nutrient levels for complete health status.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
