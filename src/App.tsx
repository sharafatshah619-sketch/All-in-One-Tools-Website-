/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { SymptomChecker } from './components/SymptomChecker';
import { FoodGuide } from './components/FoodGuide';
import { HealthCalculators } from './components/HealthCalculators';
import { DoctorChecklist } from './components/DoctorChecklist';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('checker');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [targetNutrientFilter, setTargetNutrientFilter] = useState<string | undefined>(undefined);
  const [selectedSymptomsForDoctor, setSelectedSymptomsForDoctor] = useState<string[]>([]);

  const handleGoToFoodGuide = (nutrientId?: string) => {
    setTargetNutrientFilter(nutrientId);
    setActiveTab('food_guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDoctorChecklist = (symptoms: string[]) => {
    setSelectedSymptomsForDoctor(symptoms);
    setActiveTab('doctor_checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Top sticky navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* Safety and Medical Disclaimer Banner */}
        <DisclaimerBanner onShowEmergency={() => setIsEmergencyModalOpen(true)} />

        {/* Tab 1: Symptom Checker */}
        {activeTab === 'checker' && (
          <SymptomChecker
            onGoToFoodGuide={handleGoToFoodGuide}
            onGoToDoctorChecklist={handleGoToDoctorChecklist}
          />
        )}

        {/* Tab 2: Affordable Food Guide */}
        {activeTab === 'food_guide' && (
          <FoodGuide initialNutrientFilter={targetNutrientFilter} />
        )}

        {/* Tab 3: Health Calculators */}
        {activeTab === 'calculators' && (
          <HealthCalculators
            onGoToSymptomChecker={() => {
              setActiveTab('checker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 4: Doctor Checklist */}
        {activeTab === 'doctor_checklist' && (
          <DoctorChecklist selectedSymptoms={selectedSymptomsForDoctor} />
        )}
      </main>

      {/* Emergency Guidance Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenEmergency={() => setIsEmergencyModalOpen(true)} />
    </div>
  );
}
