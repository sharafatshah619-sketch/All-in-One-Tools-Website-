import React from 'react';

interface Props {
  onOpenEmergency: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenEmergency }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 px-4 sm:px-6 mt-16 border-t border-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🩺</span>
            <div>
              <p className="font-bold text-white text-base">Vitamin Deficiency Symptom Checker</p>
              <p className="text-xs text-slate-400">Educational wellness and nutrition resource</p>
            </div>
          </div>

          <button
            onClick={onOpenEmergency}
            className="px-4 py-2 bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/60 rounded-xl text-xs font-bold transition-colors"
          >
            🚨 Emergency Warning Signs
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Medical Disclaimer</h4>
            <p>
              This application is designed solely for informational and educational purposes. It never provides medical diagnoses, treatment prescriptions, or replaces consultation with a qualified doctor.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Why Blood Tests Matter</h4>
            <p>
              Vitamins work together in balance. Taking high-dose supplements blindly without clinical lab confirmation can cause toxicity or hide underlying medical illnesses like thyroid or gastrointestinal disorders.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">User Privacy Guaranteed</h4>
            <p>
              No personal health data, age, or symptom selections are collected or saved to any external servers. Everything runs entirely inside your private web browser.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>Built with clear, simple English for universal health awareness & everyday wellness.</p>
        </div>
      </div>
    </footer>
  );
};
