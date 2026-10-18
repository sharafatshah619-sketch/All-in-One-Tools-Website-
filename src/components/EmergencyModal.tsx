import React from 'react';
import { EMERGENCY_RED_FLAGS } from '../data/nutritionData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-red-200 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-red-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl" role="img" aria-label="ambulance">🚑</span>
            <div>
              <h2 className="text-lg font-bold text-red-800">Emergency Medical Guidance</h2>
              <p className="text-xs text-red-600">When to seek urgent medical attention</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl font-bold p-1 leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-sm">
            <p className="font-semibold mb-1">Do not wait for diet changes if you experience:</p>
            <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-red-800">
              {EMERGENCY_RED_FLAGS.map((item, idx) => (
                <li key={idx} className="leading-snug">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">What to do immediately:</p>
            <p>1. Call your country's emergency number (such as 911, 112, or local ambulance service) or go to the nearest emergency room.</p>
            <p>2. Do not attempt to drive yourself if you are feeling dizzy, faint, or experiencing chest discomfort.</p>
            <p>3. Nutritional deficiencies develop over weeks or months. Sudden severe onset of pain, paralysis, or breathing trouble points to an acute medical issue requiring immediate hospital care.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl text-sm"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
