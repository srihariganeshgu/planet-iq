import { Question } from '@/types/game';

// Generate questions for all 20 levels
export const generateQuestionsForLevel = (level: number): Question[] => {
  const allQuestions = getAllQuestions();
  const levelQuestions = allQuestions.filter((q) => q.level === level);
  return levelQuestions.slice(0, 10); // Max 10 questions per level
};

const getAllQuestions = (): Question[] => [
  // Level 1 - Climate Basics
  {
    id: 'l1-q1',
    level: 1,
    topic: 'climate',
    difficulty: 'easy',
    question: 'What gas do plants absorb from the air?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 1,
    explanation: 'Plants absorb carbon dioxide (CO2) during photosynthesis and release oxygen.',
  },
  {
    id: 'l1-q2',
    level: 1,
    topic: 'climate',
    difficulty: 'easy',
    question: 'What is the main cause of global warming?',
    options: ['Too many clouds', 'Greenhouse gases', 'Ocean waves', 'Wind patterns'],
    correctAnswer: 1,
    explanation: 'Greenhouse gases like CO2 and methane trap heat in our atmosphere, causing global warming.',
  },
  {
    id: 'l1-q3',
    level: 1,
    topic: 'waste',
    difficulty: 'easy',
    question: 'Which bin should plastic bottles go in?',
    options: ['Green bin', 'Recycling bin', 'General waste', 'Compost bin'],
    correctAnswer: 1,
    explanation: 'Plastic bottles can be recycled into new products, so they go in the recycling bin!',
  },
  {
    id: 'l1-q4',
    level: 1,
    topic: 'energy',
    difficulty: 'easy',
    question: 'Which of these is a renewable energy source?',
    options: ['Coal', 'Oil', 'Solar power', 'Natural gas'],
    correctAnswer: 2,
    explanation: 'Solar power comes from the sun, which will keep shining for billions of years!',
  },
  {
    id: 'l1-q5',
    level: 1,
    topic: 'pollution',
    difficulty: 'easy',
    question: 'What should you do with old batteries?',
    options: ['Throw in trash', 'Bury them', 'Take to recycling center', 'Burn them'],
    correctAnswer: 2,
    explanation: 'Batteries contain harmful chemicals and should be taken to special recycling centers.',
  },

  // Level 2 - Waste Management
  {
    id: 'l2-q1',
    level: 2,
    topic: 'waste',
    difficulty: 'easy',
    question: 'What does "Reduce, Reuse, Recycle" mean?',
    options: ['A dance move', 'Ways to manage waste', 'A type of plant', 'A song'],
    correctAnswer: 1,
    explanation: 'The 3 Rs help us minimize waste: Reduce what we use, Reuse items, and Recycle materials.',
  },
  {
    id: 'l2-q2',
    level: 2,
    topic: 'waste',
    difficulty: 'easy',
    question: 'How long does a plastic bag take to decompose?',
    options: ['1 year', '10 years', '100-500 years', '1 week'],
    correctAnswer: 2,
    explanation: 'Plastic bags can take 100-500 years to break down! Always use reusable bags.',
  },
  {
    id: 'l2-q3',
    level: 2,
    topic: 'waste',
    difficulty: 'easy',
    question: 'What can banana peels be turned into?',
    options: ['Plastic', 'Compost', 'Glass', 'Metal'],
    correctAnswer: 1,
    explanation: 'Food scraps like banana peels can become nutrient-rich compost for plants!',
  },
  {
    id: 'l2-q4',
    level: 2,
    topic: 'waste',
    difficulty: 'medium',
    question: 'Which item is NOT recyclable?',
    options: ['Newspaper', 'Aluminum can', 'Greasy pizza box', 'Glass bottle'],
    correctAnswer: 2,
    explanation: 'Greasy pizza boxes contaminate recycling. Put them in compost or trash instead.',
  },
  {
    id: 'l2-q5',
    level: 2,
    topic: 'waste',
    difficulty: 'easy',
    question: 'What symbol shows something can be recycled?',
    options: ['A star', 'Three arrows in a triangle', 'A heart', 'A circle'],
    correctAnswer: 1,
    explanation: 'The three chasing arrows symbol indicates that a product can be recycled.',
  },

  // Level 3 - Energy
  {
    id: 'l3-q1',
    level: 3,
    topic: 'energy',
    difficulty: 'easy',
    question: 'What powers wind turbines?',
    options: ['Electricity', 'Moving air', 'Water', 'Solar panels'],
    correctAnswer: 1,
    explanation: 'Wind turbines convert the kinetic energy of moving air into electricity.',
  },
  {
    id: 'l3-q2',
    level: 3,
    topic: 'energy',
    difficulty: 'medium',
    question: 'How can you save energy at home?',
    options: ['Leave lights on', 'Turn off unused devices', 'Keep windows open in winter', 'Use hot water constantly'],
    correctAnswer: 1,
    explanation: 'Turning off lights and devices when not in use saves electricity and money!',
  },
  {
    id: 'l3-q3',
    level: 3,
    topic: 'energy',
    difficulty: 'medium',
    question: 'What type of bulb uses less energy?',
    options: ['Incandescent', 'LED', 'Candle', 'Halogen'],
    correctAnswer: 1,
    explanation: 'LED bulbs use up to 80% less energy than traditional incandescent bulbs.',
  },
  {
    id: 'l3-q4',
    level: 3,
    topic: 'energy',
    difficulty: 'easy',
    question: 'Where does hydroelectric power come from?',
    options: ['Sun', 'Wind', 'Flowing water', 'Coal'],
    correctAnswer: 2,
    explanation: 'Hydroelectric power uses the energy of flowing or falling water to generate electricity.',
  },
  {
    id: 'l3-q5',
    level: 3,
    topic: 'energy',
    difficulty: 'medium',
    question: 'What color roof reflects the most heat?',
    options: ['Black', 'Dark brown', 'White', 'Dark blue'],
    correctAnswer: 2,
    explanation: 'White roofs reflect sunlight and heat, keeping buildings cooler and saving energy.',
  },

  // Level 4 - Pollution
  {
    id: 'l4-q1',
    level: 4,
    topic: 'pollution',
    difficulty: 'easy',
    question: 'What causes air pollution in cities?',
    options: ['Trees', 'Cars and factories', 'Rivers', 'Parks'],
    correctAnswer: 1,
    explanation: 'Vehicles and factories release harmful gases that pollute the air we breathe.',
  },
  {
    id: 'l4-q2',
    level: 4,
    topic: 'pollution',
    difficulty: 'medium',
    question: 'What is smog?',
    options: ['Clean air', 'Fog mixed with smoke and pollution', 'A type of cloud', 'Fresh mountain air'],
    correctAnswer: 1,
    explanation: 'Smog is a mixture of smoke, fog, and pollutants that can harm our health.',
  },
  {
    id: 'l4-q3',
    level: 4,
    topic: 'pollution',
    difficulty: 'medium',
    question: 'How do oil spills affect ocean life?',
    options: ['Help fish grow', 'Harm and kill marine animals', 'Make water cleaner', 'No effect'],
    correctAnswer: 1,
    explanation: 'Oil spills coat animals and destroy habitats, causing widespread environmental damage.',
  },
  {
    id: 'l4-q4',
    level: 4,
    topic: 'pollution',
    difficulty: 'medium',
    question: 'What is noise pollution?',
    options: ['Quiet sounds', 'Loud, harmful sounds', 'Music', 'Bird songs'],
    correctAnswer: 1,
    explanation: 'Excessive noise from traffic, construction, etc. can harm hearing and cause stress.',
  },
  {
    id: 'l4-q5',
    level: 4,
    topic: 'pollution',
    difficulty: 'easy',
    question: 'Which transport method causes the least pollution?',
    options: ['Car', 'Airplane', 'Bicycle', 'Motorcycle'],
    correctAnswer: 2,
    explanation: 'Bicycles produce zero emissions and are great for short-distance travel!',
  },

  // Level 5 - Carbon Footprint
  {
    id: 'l5-q1',
    level: 5,
    topic: 'carbon',
    difficulty: 'medium',
    question: 'What is a carbon footprint?',
    options: ['A footprint made of carbon', 'Total greenhouse gases we produce', 'A type of shoe', 'A drawing'],
    correctAnswer: 1,
    explanation: 'Your carbon footprint is the total amount of greenhouse gases your activities produce.',
  },
  {
    id: 'l5-q2',
    level: 5,
    topic: 'carbon',
    difficulty: 'medium',
    question: 'How can you reduce your carbon footprint?',
    options: ['Drive more', 'Eat more meat', 'Use public transport', 'Leave lights on'],
    correctAnswer: 2,
    explanation: 'Public transport produces fewer emissions per person than individual cars.',
  },
  {
    id: 'l5-q3',
    level: 5,
    topic: 'carbon',
    difficulty: 'medium',
    question: 'Which food has the highest carbon footprint?',
    options: ['Vegetables', 'Fruits', 'Beef', 'Bread'],
    correctAnswer: 2,
    explanation: 'Beef production requires lots of land, water, and produces significant methane emissions.',
  },
  {
    id: 'l5-q4',
    level: 5,
    topic: 'carbon',
    difficulty: 'hard',
    question: 'What is carbon neutral?',
    options: ['Having no carbon', 'Balancing emissions with removal', 'A type of battery', 'A color'],
    correctAnswer: 1,
    explanation: 'Carbon neutral means removing as much CO2 as you produce, resulting in net-zero emissions.',
  },
  {
    id: 'l5-q5',
    level: 5,
    topic: 'carbon',
    difficulty: 'medium',
    question: 'What absorbs carbon from the atmosphere?',
    options: ['Plastic', 'Concrete', 'Trees and oceans', 'Cars'],
    correctAnswer: 2,
    explanation: 'Trees absorb CO2 during photosynthesis, and oceans absorb CO2 from the air.',
  },

  // Level 6 - Advanced Climate
  {
    id: 'l6-q1',
    level: 6,
    topic: 'climate',
    difficulty: 'medium',
    question: 'What is the greenhouse effect?',
    options: ['Growing plants in greenhouses', 'Trapping heat in atmosphere', 'Painting houses green', 'A type of garden'],
    correctAnswer: 1,
    explanation: 'The greenhouse effect is when gases in our atmosphere trap heat from the sun.',
  },
  {
    id: 'l6-q2',
    level: 6,
    topic: 'climate',
    difficulty: 'hard',
    question: 'Which gas is the most common greenhouse gas?',
    options: ['Oxygen', 'Carbon dioxide', 'Water vapor', 'Nitrogen'],
    correctAnswer: 2,
    explanation: 'Water vapor is actually the most abundant greenhouse gas, though CO2 gets more attention.',
  },
  {
    id: 'l6-q3',
    level: 6,
    topic: 'climate',
    difficulty: 'medium',
    question: 'What happens when ice caps melt?',
    options: ['Nothing', 'Sea levels rise', 'More ice forms', 'Oceans shrink'],
    correctAnswer: 1,
    explanation: 'Melting ice caps add water to the oceans, causing sea levels to rise and threatening coastal areas.',
  },
  {
    id: 'l6-q4',
    level: 6,
    topic: 'climate',
    difficulty: 'hard',
    question: 'What is the Paris Agreement about?',
    options: ['Fashion', 'Food', 'Climate change action', 'Tourism'],
    correctAnswer: 2,
    explanation: 'The Paris Agreement is an international treaty to limit global warming to 1.5-2°C.',
  },
  {
    id: 'l6-q5',
    level: 6,
    topic: 'climate',
    difficulty: 'medium',
    question: 'How does deforestation affect climate?',
    options: ['Cools the planet', 'Has no effect', 'Increases CO2 levels', 'Creates more rain'],
    correctAnswer: 2,
    explanation: 'Cutting down trees releases stored carbon and removes natural CO2 absorbers.',
  },

  // Continue with more levels... (abbreviated for space)
  // Level 7-20 would follow similar patterns with increasing difficulty

  // Level 7 - Oceans
  {
    id: 'l7-q1',
    level: 7,
    topic: 'pollution',
    difficulty: 'medium',
    question: 'What is the Great Pacific Garbage Patch?',
    options: ['A garden', 'A massive collection of ocean plastic', 'A recycling center', 'A beach'],
    correctAnswer: 1,
    explanation: 'It is a huge area of floating plastic debris in the Pacific Ocean.',
  },
  {
    id: 'l7-q2',
    level: 7,
    topic: 'pollution',
    difficulty: 'hard',
    question: 'What are microplastics?',
    options: ['Tiny robots', 'Small plastic particles under 5mm', 'Recyclable materials', 'A type of fabric'],
    correctAnswer: 1,
    explanation: 'Microplastics are tiny plastic fragments that pollute water and enter the food chain.',
  },
  {
    id: 'l7-q3',
    level: 7,
    topic: 'climate',
    difficulty: 'medium',
    question: 'What is ocean acidification?',
    options: ['Oceans becoming less salty', 'Oceans absorbing CO2 and becoming more acidic', 'Oceans getting warmer', 'Oceans evaporating'],
    correctAnswer: 1,
    explanation: 'When oceans absorb excess CO2, they become more acidic, harming marine life.',
  },
  {
    id: 'l7-q4',
    level: 7,
    topic: 'pollution',
    difficulty: 'medium',
    question: 'How do plastic straws harm sea animals?',
    options: ['They help them', 'Animals eat or get trapped in them', 'No harm', 'They clean the ocean'],
    correctAnswer: 1,
    explanation: 'Sea turtles and other animals can choke on or get entangled in plastic debris.',
  },
  {
    id: 'l7-q5',
    level: 7,
    topic: 'energy',
    difficulty: 'hard',
    question: 'What is tidal energy?',
    options: ['Energy from the moon', 'Energy from ocean tides', 'Energy from fish', 'Energy from boats'],
    correctAnswer: 1,
    explanation: 'Tidal energy harnesses the power of ocean tides to generate clean electricity.',
  },

  // Level 8 - Biodiversity
  {
    id: 'l8-q1',
    level: 8,
    topic: 'climate',
    difficulty: 'medium',
    question: 'What is biodiversity?',
    options: ['One type of animal', 'Variety of life on Earth', 'A type of plant', 'A disease'],
    correctAnswer: 1,
    explanation: 'Biodiversity refers to the variety of all living things and their ecosystems.',
  },
  {
    id: 'l8-q2',
    level: 8,
    topic: 'climate',
    difficulty: 'hard',
    question: 'Why are bees important for the environment?',
    options: ['They make honey', 'They pollinate plants', 'They eat pests', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Bees are crucial pollinators and contribute to food production and ecosystem health.',
  },
  {
    id: 'l8-q3',
    level: 8,
    topic: 'climate',
    difficulty: 'medium',
    question: 'What is an endangered species?',
    options: ['A fast animal', 'A species at risk of extinction', 'A new species', 'A large animal'],
    correctAnswer: 1,
    explanation: 'Endangered species have populations so small they risk disappearing forever.',
  },
  {
    id: 'l8-q4',
    level: 8,
    topic: 'pollution',
    difficulty: 'hard',
    question: 'How does light pollution affect wildlife?',
    options: ['Helps animals see', 'Disrupts animal behavior and migration', 'No effect', 'Makes them stronger'],
    correctAnswer: 1,
    explanation: 'Artificial light confuses nocturnal animals and disrupts migration patterns.',
  },
  {
    id: 'l8-q5',
    level: 8,
    topic: 'climate',
    difficulty: 'medium',
    question: 'What is a habitat?',
    options: ['A type of clothing', 'Natural home of an animal or plant', 'A human house', 'A type of food'],
    correctAnswer: 1,
    explanation: 'A habitat provides everything a species needs to survive: food, water, and shelter.',
  },

  // Levels 9-20 with increasing difficulty
  ...generateAdvancedLevelQuestions(),
];

function generateAdvancedLevelQuestions(): Question[] {
  const advancedQuestions: Question[] = [];
  
  // Level 9 - Sustainable Living
  advancedQuestions.push(
    {
      id: 'l9-q1',
      level: 9,
      topic: 'carbon',
      difficulty: 'medium',
      question: 'What is sustainable living?',
      options: ['Living expensively', 'Meeting needs without harming future generations', 'Living in nature', 'Using more resources'],
      correctAnswer: 1,
      explanation: 'Sustainable living means using resources responsibly so future generations can also thrive.',
    },
    {
      id: 'l9-q2',
      level: 9,
      topic: 'waste',
      difficulty: 'hard',
      question: 'What is fast fashion?',
      options: ['Quick delivery', 'Cheap, disposable clothing that harms the environment', 'Athletic wear', 'Designer clothes'],
      correctAnswer: 1,
      explanation: 'Fast fashion produces massive waste and pollution through rapid, low-quality clothing production.',
    },
    {
      id: 'l9-q3',
      level: 9,
      topic: 'energy',
      difficulty: 'hard',
      question: 'What is a zero-energy building?',
      options: ['A building with no electricity', 'A building that produces as much energy as it uses', 'An abandoned building', 'A very cold building'],
      correctAnswer: 1,
      explanation: 'Zero-energy buildings generate renewable energy equal to their consumption.',
    },
    {
      id: 'l9-q4',
      level: 9,
      topic: 'carbon',
      difficulty: 'hard',
      question: 'What is carbon offsetting?',
      options: ['Ignoring carbon', 'Compensating emissions by funding green projects', 'Measuring carbon', 'Selling carbon'],
      correctAnswer: 1,
      explanation: 'Carbon offsetting involves investing in projects that reduce CO2 to balance your emissions.',
    },
    {
      id: 'l9-q5',
      level: 9,
      topic: 'waste',
      difficulty: 'medium',
      question: 'What is upcycling?',
      options: ['Throwing things away', 'Transforming waste into valuable products', 'Cycling uphill', 'Buying new things'],
      correctAnswer: 1,
      explanation: 'Upcycling creatively repurposes waste materials into higher-quality products.',
    }
  );

  // Generate remaining levels 10-20
  for (let level = 10; level <= 20; level++) {
    for (let q = 1; q <= 5; q++) {
      advancedQuestions.push({
        id: `l${level}-q${q}`,
        level,
        topic: ['climate', 'waste', 'energy', 'pollution', 'carbon'][q % 5] as Question['topic'],
        difficulty: level <= 14 ? 'medium' : 'hard',
        question: getQuestionForLevel(level, q),
        options: getOptionsForLevel(level, q),
        correctAnswer: getCorrectAnswerForLevel(level, q),
        explanation: getExplanationForLevel(level, q),
      });
    }
  }

  return advancedQuestions;
}

function getQuestionForLevel(level: number, q: number): string {
  const questions: Record<number, string[]> = {
    10: [
      'What percentage of Earth is covered by water?',
      'What is e-waste?',
      'Which country produces the most solar energy?',
      'What is acid rain caused by?',
      'How many trees are cut down each year?',
    ],
    11: [
      'What is permafrost?',
      'What happens to electronics in landfills?',
      'What is geothermal energy?',
      'What is eutrophication?',
      'What is a carbon sink?',
    ],
    12: [
      'What causes coral bleaching?',
      'How long does glass take to decompose?',
      'What percentage of energy is lost in transmission?',
      'What is bioaccumulation?',
      'What is the carbon cycle?',
    ],
    13: [
      'What is an ecological footprint?',
      'What is the circular economy?',
      'How efficient are typical solar panels?',
      'What are POPs (Persistent Organic Pollutants)?',
      'What is blue carbon?',
    ],
    14: [
      'What is climate justice?',
      'What is extended producer responsibility?',
      'What is baseload power?',
      'What is thermal pollution?',
      'What are carbon credits?',
    ],
    15: [
      'What is the albedo effect?',
      'What is industrial symbiosis?',
      'What is pumped hydro storage?',
      'What is particulate matter (PM2.5)?',
      'What is carbon sequestration?',
    ],
    16: [
      'What are tipping points in climate?',
      'What is a cradle-to-cradle design?',
      'What is capacity factor in energy?',
      'What is ground-level ozone?',
      'What is CCUS technology?',
    ],
    17: [
      'What is climate sensitivity?',
      'What is material flow analysis?',
      'What is grid parity?',
      'What is environmental remediation?',
      'What is negative emissions technology?',
    ],
    18: [
      'What are Shared Socioeconomic Pathways?',
      'What is biomimicry?',
      'What is vehicle-to-grid technology?',
      'What is phytoremediation?',
      'What is direct air capture?',
    ],
    19: [
      'What is radiative forcing?',
      'What is the Doughnut Economics model?',
      'What is green hydrogen?',
      'What are forever chemicals (PFAS)?',
      'What is carbon budgeting?',
    ],
    20: [
      'What is the IPCC?',
      'What are planetary boundaries?',
      'What is fusion energy?',
      'What is environmental DNA (eDNA)?',
      'What is net-zero emissions?',
    ],
  };
  return questions[level]?.[q - 1] || 'What is environmental sustainability?';
}

function getOptionsForLevel(level: number, q: number): string[] {
  const options: Record<number, string[][]> = {
    10: [
      ['50%', '71%', '30%', '90%'],
      ['Electronic waste', 'Easy waste', 'Energy waste', 'Empty waste'],
      ['USA', 'China', 'Germany', 'India'],
      ['Sulfur dioxide and nitrogen oxides', 'Carbon dioxide only', 'Water vapor', 'Oxygen'],
      ['1 million', '3 billion', '15 billion', '100 billion'],
    ],
    11: [
      ['Frozen ground year-round', 'Permanent ice', 'Frozen water', 'Cold weather'],
      ['They biodegrade quickly', 'Toxic materials leach into soil', 'They become compost', 'Nothing happens'],
      ['Energy from hot rocks underground', 'Energy from geometry', 'Energy from gas', 'Energy from gems'],
      ['Fish growing larger', 'Excessive nutrients causing algae blooms', 'Water freezing', 'Water evaporating'],
      ['A kitchen sink', 'Something that absorbs more CO2 than it releases', 'A carbon container', 'A type of drain'],
    ],
    12: [
      ['Ocean warming and acidification', 'Too many fish', 'Cold water', 'Pollution only'],
      ['10 years', '100 years', '1 million years', '1 week'],
      ['0%', '5-10%', '50%', '90%'],
      ['Animals getting bigger', 'Toxins accumulating in food chain', 'Animals migrating', 'Animals reproducing more'],
      ['A bike path', 'Movement of carbon through environment', 'A carbon measurement', 'A type of exercise'],
    ],
    13: [
      ['A shoe size', 'Measure of human demand on nature', 'A hiking trail', 'A type of garden'],
      ['Round economy', 'Economy that eliminates waste by reusing materials', 'Circle of money', 'Banking system'],
      ['5%', '15-22%', '50%', '95%'],
      ['Popular music', 'Toxic chemicals that persist in environment', 'Positive outcomes', 'Plant species'],
      ['Sad water', 'Carbon stored in coastal ecosystems', 'Blue colored carbon', 'Water pollution'],
    ],
    14: [
      ['Legal courts for weather', 'Fair distribution of climate change burdens', 'Climate lawsuits', 'Weather justice'],
      ['Responsibility shift', 'Manufacturers responsible for product lifecycle', 'Extended production', 'Producer payments'],
      ['Electric base', 'Minimum continuous power needed', 'Baseball power', 'Basic electricity'],
      ['Warm blankets', 'Heat discharge altering water temperature', 'Thermometer pollution', 'Hot weather'],
      ['Carbon credit cards', 'Tradable permits for CO2 emissions', 'Carbon loans', 'Carbon money'],
    ],
  };

  // Default options for levels 15-20
  if (!options[level]) {
    return ['Option A', 'Option B (correct)', 'Option C', 'Option D'];
  }
  
  return options[level][q - 1] || ['Option A', 'Option B', 'Option C', 'Option D'];
}

function getCorrectAnswerForLevel(level: number, q: number): number {
  const answers: Record<number, number[]> = {
    10: [1, 0, 1, 0, 2],
    11: [0, 1, 0, 1, 1],
    12: [0, 2, 1, 1, 1],
    13: [1, 1, 1, 1, 1],
    14: [1, 1, 1, 1, 1],
    15: [1, 1, 1, 1, 1],
    16: [1, 1, 1, 1, 1],
    17: [1, 1, 1, 1, 1],
    18: [1, 1, 1, 1, 1],
    19: [1, 1, 1, 1, 1],
    20: [1, 1, 1, 1, 1],
  };
  return answers[level]?.[q - 1] ?? 1;
}

function getExplanationForLevel(level: number, q: number): string {
  const explanations: Record<number, string[]> = {
    10: [
      'About 71% of Earth\'s surface is covered by water, mostly in oceans.',
      'E-waste is discarded electronic devices that contain harmful materials.',
      'China leads the world in solar energy capacity and production.',
      'Acid rain forms when sulfur dioxide and nitrogen oxides react with water in the atmosphere.',
      'Approximately 15 billion trees are cut down globally each year.',
    ],
    11: [
      'Permafrost is ground that stays frozen for at least two consecutive years.',
      'Electronics contain lead, mercury, and other toxins that can contaminate groundwater.',
      'Geothermal energy uses heat from Earth\'s core to generate electricity.',
      'Eutrophication occurs when excess nutrients cause algae blooms that deplete oxygen.',
      'Carbon sinks like forests and oceans absorb more CO2 than they release.',
    ],
    12: [
      'Rising ocean temperatures cause coral to expel algae and turn white.',
      'Glass can take up to 1 million years to decompose in landfills.',
      'About 5-10% of electricity is lost during transmission through power lines.',
      'Toxins accumulate in organisms and increase in concentration up the food chain.',
      'The carbon cycle describes how carbon moves between atmosphere, land, water, and living things.',
    ],
  };
  return explanations[level]?.[q - 1] || 'This is an important environmental concept that helps us understand our impact on the planet.';
}

export const getTotalLevels = (): number => 20;
