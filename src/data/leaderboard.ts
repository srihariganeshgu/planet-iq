import { LeaderboardEntry } from '@/types/game';

// Mock leaderboard data
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    playerName: 'EcoWarrior2024',
    heroId: 'climate-guardian',
    totalXP: 15420,
    accuracy: 94.5,
    levelsCompleted: 18,
    rank: 1,
  },
  {
    id: '2',
    playerName: 'GreenHero99',
    heroId: 'green-genius',
    totalXP: 14200,
    accuracy: 92.3,
    levelsCompleted: 17,
    rank: 2,
  },
  {
    id: '3',
    playerName: 'PlanetSaver',
    heroId: 'eco-scout',
    totalXP: 13890,
    accuracy: 88.7,
    levelsCompleted: 16,
    rank: 3,
  },
  {
    id: '4',
    playerName: 'RecycleKing',
    heroId: 'recycling-warrior',
    totalXP: 12500,
    accuracy: 85.2,
    levelsCompleted: 15,
    rank: 4,
  },
  {
    id: '5',
    playerName: 'NatureLover',
    heroId: 'climate-guardian',
    totalXP: 11800,
    accuracy: 90.1,
    levelsCompleted: 14,
    rank: 5,
  },
  {
    id: '6',
    playerName: 'EarthGuardian',
    heroId: 'eco-scout',
    totalXP: 10200,
    accuracy: 87.4,
    levelsCompleted: 13,
    rank: 6,
  },
  {
    id: '7',
    playerName: 'ClimateChamp',
    heroId: 'green-genius',
    totalXP: 9500,
    accuracy: 82.9,
    levelsCompleted: 12,
    rank: 7,
  },
  {
    id: '8',
    playerName: 'GreenTeam',
    heroId: 'recycling-warrior',
    totalXP: 8700,
    accuracy: 79.6,
    levelsCompleted: 11,
    rank: 8,
  },
  {
    id: '9',
    playerName: 'EcoStudent',
    heroId: 'eco-scout',
    totalXP: 7200,
    accuracy: 76.3,
    levelsCompleted: 10,
    rank: 9,
  },
  {
    id: '10',
    playerName: 'NewbieSaver',
    heroId: 'climate-guardian',
    totalXP: 5400,
    accuracy: 71.8,
    levelsCompleted: 8,
    rank: 10,
  },
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  return [...mockLeaderboard].sort((a, b) => b.totalXP - a.totalXP);
};

export const addToLeaderboard = (entry: Omit<LeaderboardEntry, 'rank'>): LeaderboardEntry[] => {
  const newEntry = { ...entry, rank: 0 };
  const updatedLeaderboard = [...mockLeaderboard, newEntry]
    .sort((a, b) => b.totalXP - a.totalXP)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
  
  return updatedLeaderboard;
};
