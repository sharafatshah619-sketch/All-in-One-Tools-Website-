import { Symptom, NutrientInfo, FoodItem } from '../types';

export const NUTRIENTS: Record<string, NutrientInfo> = {
  vitamin_d: {
    id: 'vitamin_d',
    name: 'Vitamin D',
    category: 'vitamin',
    emoji: '☀️',
    simpleRole: 'Helps your body absorb calcium and keeps bones, teeth, and muscles strong.',
    whyImportant: 'Known as the sunshine vitamin. It helps bone density, mood regulation, and immune health.',
    commonSymptoms: ['Tiredness and weakness', 'Bone pain', 'Muscle cramps', 'Frequent illness', 'Hair loss'],
    affordableFoods: ['Eggs (especially egg yolk)', 'Fortified milk & yogurt', 'Canned sardines or tuna', 'Mushrooms exposed to sunlight'],
    recommendedBloodTest: '25-Hydroxy Vitamin D test [25(OH)D]',
    absorptionTip: 'Best taken with healthy fats (such as milk, eggs, or nuts) because it is a fat-soluble vitamin.',
    atRiskGroups: ['People with low outdoor sun exposure', 'Older adults', 'People with darker skin', 'People who stay indoors all day']
  },
  vitamin_b12: {
    id: 'vitamin_b12',
    name: 'Vitamin B12 (Cobalamin)',
    category: 'vitamin',
    emoji: '🥩',
    simpleRole: 'Crucial for making healthy red blood cells and keeping nerves functioning properly.',
    whyImportant: 'B12 prevents nerve damage, severe fatigue, and megaloblastic anemia.',
    commonSymptoms: ['Tiredness and weakness', 'Tingling in hands and feet', 'Pale skin', 'Mouth ulcers', 'Brain fog or mood changes'],
    affordableFoods: ['Eggs', 'Milk, yogurt, and paneer', 'Chicken liver / affordable meats', 'Fortified breakfast cereals', 'Fish (like sardines)'],
    recommendedBloodTest: 'Serum Vitamin B12 blood test & Active B12 (Holotranscobalamin)',
    absorptionTip: 'Requires stomach acid and stomach intrinsic factor to absorb. Antacids may lower absorption over time.',
    atRiskGroups: ['Strict vegetarians and vegans (naturally found almost only in animal foods)', 'People over 50 years', 'People on acid reflux medication']
  },
  vitamin_b9: {
    id: 'vitamin_b9',
    name: 'Vitamin B9 (Folate / Folic Acid)',
    category: 'vitamin',
    emoji: '🥬',
    simpleRole: 'Needed to make healthy DNA and red blood cells, and prevents birth defects.',
    whyImportant: 'Works hand-in-hand with Vitamin B12. Lack of folate causes fatigue and mouth sores.',
    commonSymptoms: ['Tiredness and weakness', 'Mouth ulcers', 'Pale skin', 'Frequent illness', 'Slow wound healing'],
    affordableFoods: ['Lentils (daal) and chickpeas', 'Spinach and mustard greens', 'Peanuts and sunflower seeds', 'Bananas and oranges', 'Eggs'],
    recommendedBloodTest: 'Serum Folate & Red Blood Cell (RBC) Folate test',
    absorptionTip: 'Easily lost in prolonged cooking water. Light steaming or eating fresh greens preserves folate best.',
    atRiskGroups: ['Pregnant or planning pregnancy', 'People who rarely eat fresh green vegetables or legumes']
  },
  vitamin_c: {
    id: 'vitamin_c',
    name: 'Vitamin C (Ascorbic Acid)',
    category: 'vitamin',
    emoji: '🍊',
    simpleRole: 'Builds collagen for skin and wounds, strengthens immunity, and helps absorb plant iron.',
    whyImportant: 'Essential for healing cuts, protecting gums, and fighting everyday infections.',
    commonSymptoms: ['Frequent illness', 'Slow wound healing', 'Bleeding or swollen gums', 'Tiredness and weakness', 'Pale or rough dry skin'],
    affordableFoods: ['Amla (Indian gooseberry - extremely rich and cheap)', 'Seasonal citrus (oranges, lemons, sweet lime)', 'Guava', 'Tomatoes', 'Green chilies & bell peppers'],
    recommendedBloodTest: 'Plasma Ascorbic Acid blood level test',
    absorptionTip: 'Heat destroys Vitamin C! Squeeze fresh lemon over cooked food right before eating instead of boiling it.',
    atRiskGroups: ['Smokers (need 35 mg more per day)', 'People with low fresh fruit/vegetable intake']
  },
  vitamin_a: {
    id: 'vitamin_a',
    name: 'Vitamin A (Retinol & Beta-Carotene)',
    category: 'vitamin',
    emoji: '🥕',
    simpleRole: 'Protects eyesight, supports vision in dim light, and keeps skin and immunity healthy.',
    whyImportant: 'Critical for the retina to sense light at dusk or night.',
    commonSymptoms: ['Poor night vision', 'Frequent illness', 'Dry eyes and skin', 'Slow wound healing'],
    affordableFoods: ['Carrots', 'Spinach and leafy dark greens', 'Sweet potatoes / pumpkins', 'Eggs', 'Milk and butter'],
    recommendedBloodTest: 'Serum Retinol blood test',
    absorptionTip: 'Beta-carotene in carrots and greens absorbs much better when cooked lightly with a tiny drop of oil or butter.',
    atRiskGroups: ['Young children with poor diet variety', 'People with fat absorption or digestive issues']
  },
  vitamin_b1: {
    id: 'vitamin_b1',
    name: 'Vitamin B1 (Thiamine)',
    category: 'vitamin',
    emoji: '🌾',
    simpleRole: 'Helps turn carbohydrates and nutrients into usable energy for cells and nerves.',
    whyImportant: 'Your brain, muscles, and heart need constant thiamine to generate energy.',
    commonSymptoms: ['Tiredness and weakness', 'Muscle cramps and muscle weakness', 'Tingling in hands and feet', 'Loss of appetite'],
    affordableFoods: ['Whole wheat flour (atta)', 'Brown rice and oats', 'Lentils, beans, and peas', 'Peanuts and sunflower seeds', 'Eggs'],
    recommendedBloodTest: 'Whole blood Thiamine Diphosphate (TDP) test',
    absorptionTip: 'Refined white flour and white sugar lack thiamine. Choose unpolished grains and whole pulses.',
    atRiskGroups: ['People consuming high refined sugar/white flour diets', 'People with heavy alcohol consumption', 'People with chronic gut issues']
  },
  vitamin_b6: {
    id: 'vitamin_b6',
    name: 'Vitamin B6 (Pyridoxine)',
    category: 'vitamin',
    emoji: '🍌',
    simpleRole: 'Helps balance mood chemicals, make hemoglobin, and supports immune cell production.',
    whyImportant: 'Necessary for nerve signaling, brain function, and protein metabolism.',
    commonSymptoms: ['Mouth ulcers and cracked lips', 'Tingling in hands and feet', 'Tiredness and weakness', 'Frequent illness', 'Mood changes'],
    affordableFoods: ['Bananas', 'Potatoes with skin', 'Chickpeas and lentils', 'Eggs', 'Chicken and fish', 'Peanuts'],
    recommendedBloodTest: 'Plasma Pyridoxal 5-Phosphate (PLP) blood test',
    absorptionTip: 'B6 from animal foods and beans is readily absorbed. Avoid excessive alcohol which depletes B6.',
    atRiskGroups: ['People with kidney disease', 'People taking certain medications (e.g. tuberculosis medication isoniazid)']
  },
  iron: {
    id: 'iron',
    name: 'Iron (Essential Mineral)',
    category: 'mineral', // clearly distinguish iron from vitamins!
    emoji: '🩸',
    simpleRole: 'Crucial mineral that carries oxygen through your bloodstream to all organs and muscles.',
    whyImportant: 'NOTE: Iron is an essential mineral, NOT a vitamin! Low iron leads to iron-deficiency anemia.',
    commonSymptoms: ['Tiredness and weakness', 'Pale skin', 'Hair loss', 'Muscle cramps', 'Brittle nails', 'Tingling in hands and feet'],
    affordableFoods: ['Spinach, fenugreek (methi), and leafy greens', 'Lentils (daal), black beans, chickpeas', 'Eggs', 'Jaggery (gur)', 'Chicken liver and lean meat', 'Pumpkin seeds'],
    recommendedBloodTest: 'Complete Blood Count (CBC) and Serum Ferritin (measures iron stores)',
    absorptionTip: 'SUPER TIP: Drink or eat Vitamin C (like lemon juice or oranges) with plant iron foods to double absorption! Avoid drinking tea or coffee within 1 hour of meals as tannins block iron absorption.',
    atRiskGroups: ['Women with heavy menstrual periods', 'Vegetarians and vegans', 'Pregnant women', 'Growing children']
  }
};

export const SYMPTOMS_LIST: Symptom[] = [
  {
    id: 'tiredness',
    name: 'Tiredness and weakness',
    simpleDescription: 'Feeling constantly drained, low stamina, or exhausted even after rest.',
    emoji: '🔋',
    category: 'energy',
    associatedNutrients: ['iron', 'vitamin_d', 'vitamin_b12', 'vitamin_b9', 'vitamin_b1', 'vitamin_c']
  },
  {
    id: 'hair_loss',
    name: 'Hair loss or thinning',
    simpleDescription: 'Noticing excess hair falling out while combing, washing, or thinning patches.',
    emoji: '💇',
    category: 'skin_hair',
    associatedNutrients: ['iron', 'vitamin_d', 'vitamin_b12']
  },
  {
    id: 'pale_skin',
    name: 'Pale skin or pale inner eyelids',
    simpleDescription: 'Skin, palms, or the inside of lower eyelids looking paler or yellowish than usual.',
    emoji: '👤',
    category: 'skin_hair',
    associatedNutrients: ['iron', 'vitamin_b12', 'vitamin_b9']
  },
  {
    id: 'muscle_cramps',
    name: 'Muscle cramps or twitching',
    simpleDescription: 'Sudden tight spasms or pain in calf muscles, legs, or toes, often at night.',
    emoji: '🦵',
    category: 'muscles_bones',
    associatedNutrients: ['vitamin_d', 'vitamin_b1', 'iron']
  },
  {
    id: 'bone_pain',
    name: 'Bone pain or aching joints',
    simpleDescription: 'Dull ache deep in back, hips, knees, or shins, especially upon waking or pressing.',
    emoji: '🦴',
    category: 'muscles_bones',
    associatedNutrients: ['vitamin_d']
  },
  {
    id: 'mouth_ulcers',
    name: 'Mouth ulcers or cracked lips',
    simpleDescription: 'Painful sores inside the cheeks, red swollen tongue, or cracks at mouth corners.',
    emoji: '👄',
    category: 'skin_hair',
    associatedNutrients: ['vitamin_b12', 'vitamin_b9', 'vitamin_b6', 'iron']
  },
  {
    id: 'tingling_hands_feet',
    name: 'Tingling or numbness in hands/feet',
    simpleDescription: 'Pins-and-needles sensation, electric prickling, or numbness in toes or fingers.',
    emoji: '🤲',
    category: 'nerves_brain',
    associatedNutrients: ['vitamin_b12', 'vitamin_b6', 'vitamin_b1']
  },
  {
    id: 'poor_night_vision',
    name: 'Poor night vision',
    simpleDescription: 'Difficulty seeing in low light, darkness, or adjusting eyes when entering dim rooms.',
    emoji: '👁️',
    category: 'immunity_vision',
    associatedNutrients: ['vitamin_a']
  },
  {
    id: 'slow_wound_healing',
    name: 'Slow wound healing',
    simpleDescription: 'Small cuts, scrapes, or bruises taking weeks longer than usual to close and heal.',
    emoji: '🩹',
    category: 'skin_hair',
    associatedNutrients: ['vitamin_c', 'vitamin_a', 'vitamin_b9']
  },
  {
    id: 'frequent_illness',
    name: 'Frequent illness or catching colds easily',
    simpleDescription: 'Getting sick with throat infections, coughs, or viruses repeatedly throughout the year.',
    emoji: '🤧',
    category: 'immunity_vision',
    associatedNutrients: ['vitamin_d', 'vitamin_c', 'vitamin_a', 'vitamin_b6']
  },
  {
    id: 'brittle_nails',
    name: 'Brittle or spoon-shaped nails',
    simpleDescription: 'Nails cracking easily, peeling, or curving upward like a spoon.',
    emoji: '💅',
    category: 'skin_hair',
    associatedNutrients: ['iron']
  },
  {
    id: 'brain_fog',
    name: 'Brain fog and mood changes',
    simpleDescription: 'Difficulty concentrating, forgetfulness, low mood, or irritability.',
    emoji: '🧠',
    category: 'nerves_brain',
    associatedNutrients: ['vitamin_b12', 'vitamin_d', 'vitamin_b6']
  }
];

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'eggs',
    name: 'Whole Eggs',
    emoji: '🥚',
    category: 'eggs',
    richIn: ['vitamin_b12', 'vitamin_d', 'vitamin_a', 'vitamin_b6', 'iron'],
    simpleDescription: 'One of nature’s most complete and affordable superfoods. Contains almost every essential nutrient.',
    affordableTip: 'Buying by the tray (12 or 30 pack) is much cheaper per unit. Eat the yolk too, as most vitamins are stored in the yolk.',
    howToEat: 'Hard boiled, scrambled with pinch of black pepper, or poached.'
  },
  {
    id: 'milk_yogurt',
    name: 'Milk and Yogurt (Curd / Dahi)',
    emoji: '🥛',
    category: 'dairy',
    richIn: ['vitamin_b12', 'vitamin_d', 'vitamin_a'],
    simpleDescription: 'Readily available dairy providing B12, calcium, and gut-friendly probiotics in fresh yogurt.',
    affordableTip: 'Plain fresh homemade yogurt (curd) is cheaper and healthier than flavored sweetened store brands.',
    howToEat: 'One glass of warm milk at bedtime or a bowl of fresh yogurt with lunch.'
  },
  {
    id: 'lentils_beans',
    name: 'Lentils, Daal, and Chickpeas',
    emoji: '🫘',
    category: 'lentils_beans',
    richIn: ['iron', 'vitamin_b9', 'vitamin_b1', 'vitamin_b6'],
    simpleDescription: 'Rich source of plant iron, folic acid, and fiber. Very budget-friendly in bulk.',
    affordableTip: 'Dry lentils store for months and cost a fraction of processed food. Yellow moong, masoor, and chana daal are staples.',
    howToEat: 'Cook as traditional soup/daal, add a squeeze of lemon to maximize iron absorption, or sprout them for salads.'
  },
  {
    id: 'spinach_leafy_greens',
    name: 'Spinach and Leafy Green Vegetables',
    emoji: '🥬',
    category: 'leafy_veg',
    richIn: ['iron', 'vitamin_b9', 'vitamin_a', 'vitamin_c'],
    simpleDescription: 'Packed with folate, beta-carotene, and non-heme iron for cellular energy.',
    affordableTip: 'Buy seasonal leafy greens like spinach (palak), mustard greens (sarson), or fenugreek (methi) from local street vendors.',
    howToEat: 'Cook lightly with tomatoes or lemon juice. Do not overboil in excess discarded water to keep folate.'
  },
  {
    id: 'seasonal_fruits',
    name: 'Seasonal Citrus & Local Fruits',
    emoji: '🍎',
    category: 'fruits',
    richIn: ['vitamin_c', 'vitamin_a', 'vitamin_b9'],
    simpleDescription: 'Guavas, oranges, amla, papayas, and bananas provide abundant Vitamin C and potassium.',
    affordableTip: 'Amla (Indian gooseberry) has 20x more Vitamin C than oranges and costs pennies. Always pick in-season local fruits.',
    howToEat: 'Eat whole fresh fruits rather than strained juice to preserve natural fiber.'
  },
  {
    id: 'fish_canned_fresh',
    name: 'Fish (Sardines, Rohu, Salmon, or Tuna)',
    emoji: '🐟',
    category: 'fish',
    richIn: ['vitamin_d', 'vitamin_b12', 'vitamin_a'],
    simpleDescription: 'Excellent natural source of Vitamin D and B12 plus healthy omega-3 fatty acids.',
    affordableTip: 'Canned sardines or local freshwater fish are often much cheaper than imported fillets and equally nutritious.',
    howToEat: 'Grilled, baked, or light curry 1 to 2 times a week.'
  },
  {
    id: 'meat_poultry',
    name: 'Poultry, Lean Meat, & Liver',
    emoji: '🍗',
    category: 'meat',
    richIn: ['vitamin_b12', 'iron', 'vitamin_b6', 'vitamin_b1'],
    simpleDescription: 'Heme iron in meat is the easiest form for human bodies to absorb.',
    affordableTip: 'Chicken liver is extremely inexpensive and is one of the highest natural sources of B12, Iron, and Vitamin A.',
    howToEat: 'Cook thoroughly with simple spices. Small portions eaten regularly provide substantial nutrition.'
  },
  {
    id: 'nuts_seeds',
    name: 'Peanuts, Sunflower, & Pumpkin Seeds',
    emoji: '🥜',
    category: 'nuts_seeds',
    richIn: ['vitamin_b1', 'vitamin_b6', 'iron', 'vitamin_b9'],
    simpleDescription: 'Roasted peanuts and pumpkin seeds deliver thiamine, magnesium, and healthy fats.',
    affordableTip: 'Plain roasted peanuts and sunflower seeds are vastly more affordable than cashews or walnuts while matching their nutrient punch.',
    howToEat: 'A small handful (30g) as an evening snack or sprinkled over meals.'
  }
];

export const EMERGENCY_RED_FLAGS = [
  'Sudden severe chest pain or pressure',
  'Sudden shortness of breath or trouble breathing',
  'Sudden weakness, facial drooping, or numbness on one side of the body',
  'Sudden severe dizziness, fainting, or loss of balance',
  'Coughing or vomiting blood, or black tarry stools',
  'Severe confusion, sudden memory loss, or slurred speech'
];
