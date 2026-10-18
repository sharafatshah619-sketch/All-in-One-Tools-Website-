export type Gender = 'female' | 'male' | 'other' | 'unspecified';

export type DietType = 
  | 'mixed' 
  | 'vegetarian' 
  | 'vegan' 
  | 'low_dairy' 
  | 'low_sunlight' 
  | 'low_fruits_veg';

export interface UserProfile {
  age: number | string;
  gender: Gender;
  diet: DietType;
  outdoorSunlight: 'low' | 'moderate' | 'high';
  notes?: string;
}

export interface Symptom {
  id: string;
  name: string;
  simpleDescription: string;
  emoji: string;
  category: 'energy' | 'skin_hair' | 'muscles_bones' | 'nerves_brain' | 'immunity_vision';
  associatedNutrients: string[]; // e.g. ['vitamin_d', 'iron']
  urgencyWarning?: string; // If this symptom could indicate immediate emergency
}

export interface NutrientInfo {
  id: string;
  name: string;
  category: 'vitamin' | 'mineral'; // to clearly distinguish Iron from vitamins!
  emoji: string;
  simpleRole: string;
  whyImportant: string;
  commonSymptoms: string[];
  affordableFoods: string[];
  recommendedBloodTest: string;
  absorptionTip: string;
  atRiskGroups: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: 'eggs' | 'dairy' | 'lentils_beans' | 'leafy_veg' | 'fruits' | 'fish' | 'meat' | 'nuts_seeds';
  richIn: string[]; // nutrient IDs
  simpleDescription: string;
  affordableTip: string;
  howToEat: string;
}

export interface DeficiencyAnalysisResult {
  nutrient: NutrientInfo;
  matchedSymptoms: Symptom[];
  matchScore: number; // calculated score
  relevanceLevel: 'Strong match' | 'Moderate match' | 'Possible match';
  dietRiskFactor: string | null;
}
