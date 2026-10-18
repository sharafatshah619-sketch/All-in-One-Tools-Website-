import React from 'react';

interface Props {
  onShowEmergency: () => void;
}

export const DisclaimerBanner: React.FC<Props> = ({ onShowEmergency }) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl select-none" role="img" aria-label="warning">ℹ️</span>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
              Educational Guide Only — Not Medical Advice
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
              Symptoms alone cannot confirm any vitamin deficiency. Many medical conditions cause similar symptoms. Always consult a licensed healthcare professional and get verified blood tests before taking supplements.
            </p>
          </div>
        </div>
        <button
          onClick={onShowEmergency}
          type="button"
          className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors border border-red-200 self-end sm:self-center"
        >
          🚨 Urgent Red Flags
        </button>
      </div>
    </div>
  );
};
