import { NUTRIENTS, SYMPTOMS_LIST } from '../data/nutritionData';
import { DeficiencyAnalysisResult, Symptom, UserProfile } from '../types';

export function analyzeSymptoms(
  selectedSymptomIds: string[],
  userProfile: UserProfile
): DeficiencyAnalysisResult[] {
  if (selectedSymptomIds.length === 0) return [];

  const selectedSymptoms: Symptom[] = SYMPTOMS_LIST.filter(s =>
    selectedSymptomIds.includes(s.id)
  );

  const nutrientScores: Record<string, { count: number; symptoms: Symptom[]; dietRisk: string | null }> = {};

  // Initialize
  Object.keys(NUTRIENTS).forEach(nutrientId => {
    nutrientScores[nutrientId] = { count: 0, symptoms: [], dietRisk: null };
  });

  // Calculate symptom associations
  selectedSymptoms.forEach(symptom => {
    symptom.associatedNutrients.forEach(nutrientId => {
      if (nutrientScores[nutrientId]) {
        nutrientScores[nutrientId].count += 1;
        nutrientScores[nutrientId].symptoms.push(symptom);
      }
    });
  });

  // Add dietary risk adjustments
  if (userProfile.diet === 'vegan' || userProfile.diet === 'vegetarian') {
    nutrientScores['vitamin_b12'].dietRisk = 'High risk: Vitamin B12 is naturally found primarily in animal products and dairy.';
    nutrientScores['iron'].dietRisk = 'Moderate risk: Plant-based iron is less easily absorbed than animal iron.';
    if (userProfile.diet === 'vegan') {
      nutrientScores['vitamin_b12'].count += 1.5;
      nutrientScores['iron'].count += 0.8;
    } else {
      nutrientScores['vitamin_b12'].count += 0.8;
    }
  }

  if (userProfile.outdoorSunlight === 'low') {
    nutrientScores['vitamin_d'].count += 1.5;
    nutrientScores['vitamin_d'].dietRisk = 'High risk: Very low outdoor sunlight exposure significantly reduces natural Vitamin D creation in the skin.';
  }

  if (userProfile.diet === 'low_fruits_veg') {
    nutrientScores['vitamin_c'].count += 1.2;
    nutrientScores['vitamin_b9'].count += 1.2;
    nutrientScores['vitamin_c'].dietRisk = 'Moderate risk: Low intake of fresh fruits and raw vegetables reduces Vitamin C and Folate intake.';
  }

  if (userProfile.diet === 'low_dairy') {
    nutrientScores['vitamin_b12'].count += 0.5;
    nutrientScores['vitamin_d'].count += 0.5;
  }

  // Filter only nutrients with at least 1 matched symptom
  const results: DeficiencyAnalysisResult[] = Object.keys(nutrientScores)
    .filter(nutrientId => nutrientScores[nutrientId].symptoms.length > 0)
    .map(nutrientId => {
      const data = nutrientScores[nutrientId];
      const matchCount = data.symptoms.length;
      let relevanceLevel: DeficiencyAnalysisResult['relevanceLevel'] = 'Possible match';

      if (matchCount >= 3 || (matchCount >= 2 && data.dietRisk)) {
        relevanceLevel = 'Strong match';
      } else if (matchCount >= 2 || (matchCount >= 1 && data.dietRisk)) {
        relevanceLevel = 'Moderate match';
      }

      return {
        nutrient: NUTRIENTS[nutrientId],
        matchedSymptoms: data.symptoms,
        matchScore: data.count,
        relevanceLevel,
        dietRiskFactor: data.dietRisk
      };
    });

  // Sort by highest score first
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
