import React, { useState } from 'react';
import { SYMPTOMS_LIST } from '../data/nutritionData';

interface Props {
  selectedSymptoms: string[];
}

export const DoctorChecklist: React.FC<Props> = ({ selectedSymptoms }) => {
  const [copied, setCopied] = useState(false);

  const bloodTests = [
    {
      name: 'Complete Blood Count (CBC / Hemogram)',
      purpose: 'Checks hemoglobin, red blood cell count, and size (MCV). Detects microcytic anemia (iron deficiency) or macrocytic anemia (B12/Folate deficiency).',
      emoji: '🩸'
    },
    {
      name: 'Serum Ferritin & Iron Profile',
      purpose: 'Ferritin measures stored iron in the liver and bone marrow. It is much more accurate than basic serum iron alone for early iron deficiency.',
      emoji: '🧲'
    },
    {
      name: '25-Hydroxy Vitamin D [25(OH)D]',
      purpose: 'Gold standard test for Vitamin D levels in the body. Assesses bone risk, muscle fatigue, and immunity.',
      emoji: '☀️'
    },
    {
      name: 'Serum Vitamin B12 (Cobalamin)',
      purpose: 'Checks B12 blood levels. Essential for tingling hands/feet, numbness, memory fog, or chronic fatigue.',
      emoji: '🥩'
    },
    {
      name: 'Serum Folate (Vitamin B9)',
      purpose: 'Often ordered alongside B12 because folate and B12 work together to form healthy red blood cells.',
      emoji: '🥬'
    },
    {
      name: 'Thyroid Stimulating Hormone (TSH)',
      purpose: 'Very important! Hypothyroidism (underactive thyroid) frequently mimics vitamin deficiency, causing severe tiredness, hair loss, and cold sensitivity.',
      emoji: '🦋'
    }
  ];

  const doctorQuestions = [
    'Based on my symptoms, would you recommend checking my Vitamin D, B12, and Ferritin levels?',
    'Could any medication I am taking be interfering with nutrient absorption (such as antacids or metformin)?',
    'Could my symptoms be related to my thyroid, stress, or another underlying medical condition rather than nutrition?',
    'If my blood test results are borderline low, what safe dosage of supplements do you recommend, and for how long?',
    'When should I schedule a follow-up blood test to check if my levels improved?'
  ];

  const handleCopy = () => {
    const symptomNames = selectedSymptoms
      .map(id => SYMPTOMS_LIST.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const textToCopy = `--- MEDICAL APPOINTMENT PREPARATION NOTE ---
Symptoms I am experiencing: ${symptomNames || 'General tiredness / nutritional review'}

Questions for my doctor:
1. Based on my symptoms, could we check Vitamin D, Vitamin B12, and Ferritin levels?
2. Could any medications I take affect nutrient absorption?
3. Could other conditions like thyroid or anemia explain these symptoms?
4. What whole food changes or targeted supplements do you recommend?

Key tests to discuss:
- Complete Blood Count (CBC)
- Serum Ferritin (Iron stores)
- 25(OH) Vitamin D
- Serum Vitamin B12
- Serum Folate
- Thyroid (TSH)
--------------------------------------------`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-xs font-bold mb-2">
              <span>📋 Healthcare Discussion Guide</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Doctor Visit & Lab Test Checklist</h2>
            <p className="text-sm text-slate-600 mt-1">
              Use this checklist to prepare for your medical consultation. Your doctor can order precise blood tests to rule out deficiencies safely.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <span>{copied ? '✅ Copied to Clipboard!' : '📋 Copy Questions to Clipboard'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <span>🖨️ Print</span>
            </button>
          </div>
        </div>

        {/* Selected Symptoms Summary */}
        {selectedSymptoms.length > 0 && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs uppercase font-bold text-slate-500 block mb-2">
              Your Marked Symptoms to Mention to the Doctor ({selectedSymptoms.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(id => {
                const s = SYMPTOMS_LIST.find(item => item.id === id);
                if (!s) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                  >
                    <span>{s.emoji}</span>
                    <span>{s.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Questions to ask */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-slate-900">
            💬 5 Clear Questions to Ask Your Doctor
          </h3>
          <div className="space-y-2">
            {doctorQuestions.map((q, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                <span className="font-bold text-blue-700">{idx + 1}.</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Lab Tests */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            🔬 Key Blood Tests Explained
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Understanding what each test measures helps you read your laboratory report with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bloodTests.map((test, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{test.emoji}</span>
                <h4 className="font-bold text-slate-900 text-sm">{test.name}</h4>
              </div>
              <p className="text-slate-600 leading-relaxed pt-1">{test.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
