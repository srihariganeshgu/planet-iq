// Hero Types
export interface HeroAttributes {
  maxLives: number;
  hints: number;
  hintStrength: 'weak' | 'medium' | 'strong';
}

export interface Hero {
  id: string;
  name: string;
  description: string;
  animation?: string; // optional
  emoji?: string;     // optional fallback
  color: string;
  attributes: {
    maxLives: number;
    hints: number;
    hintStrength: 'weak' | 'medium' | 'strong';
  };
}

// Question Types
export interface Question {
  id: string;
  level: number;
  topic: 'climate' | 'waste' | 'energy' | 'pollution' | 'carbon';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Game State Types
export interface LevelProgress {
  levelId: number;
  completed: boolean;
  stars: number; // 1-3
  bestScore: number;
  bestTime: number;
  accuracy: number;
}

export interface PlayerProgress {
  currentLevel: number;
  totalXP: number;
  levelsProgress: Record<number, LevelProgress>;
  selectedHeroId: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  playerName: string;
  heroId: string;
  totalXP: number;
  accuracy: number;
  levelsCompleted: number;
  rank: number;
}

// Game Session Types
export interface GameSession {
  levelId: number;
  currentQuestion: number;
  lives: number;
  score: number;
  hintsUsed: number;
  hintsRemaining: number;
  startTime: number;
  correctAnswers: number;
  wrongAnswers: number;
  isGameOver: boolean;
  isLevelComplete: boolean;
}

// Hint Types
export type HintType = 'eliminate' | 'keyword' | 'ai-explanation';

export interface HintResult {
  type: HintType;
  content: string;
  eliminatedOption?: number;
}
