import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerProgress, GameSession, LevelProgress, Hero } from '@/types/game';
import { getHeroById } from '@/data/heroes';
import { getTotalLevels } from '@/data/questions';

interface GameStore {
  playerProgress: PlayerProgress;
  playerName: string;
  gameSession: GameSession | null;

  setPlayerName: (name: string) => void;
  selectHero: (heroId: string) => void;
  getSelectedHero: () => Hero | undefined;

  startLevel: (levelId: number) => void;
  answerQuestion: (isCorrect: boolean) => void;
  nextQuestion: () => void;
  useHint: () => void;
  endLevel: (completed: boolean) => void;
  resetGameSession: () => void;

  updateLevelProgress: (levelId: number, progress: Partial<LevelProgress>) => void;
  addXP: (amount: number) => void;
  unlockNextLevel: () => void;

  canPlayLevel: (levelId: number) => boolean;
  getLevelProgress: (levelId: number) => LevelProgress | undefined;
  calculateStars: (accuracy: number, hintsUsed: number) => number;
}

const initialPlayerProgress: PlayerProgress = {
  currentLevel: 1,
  totalXP: 0,
  levelsProgress: {},
  selectedHeroId: '',
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      playerProgress: initialPlayerProgress,
      playerName: '',
      gameSession: null,

      /* ---------- PLAYER ---------- */

      setPlayerName: (name) => set({ playerName: name }),

      selectHero: (heroId) =>
        set((state) => ({
          playerProgress: {
            ...state.playerProgress,
            selectedHeroId: heroId,
          },
        })),

      getSelectedHero: () => {
        const { selectedHeroId } = get().playerProgress;
        return getHeroById(selectedHeroId);
      },

      /* ---------- GAME SESSION ---------- */

      startLevel: (levelId) => {
        const hero = get().getSelectedHero();
        if (!hero) return;

        const session: GameSession = {
          levelId,
          currentQuestion: 0,
          lives: hero.attributes.maxLives,
          score: 0,
          hintsUsed: 0,
          hintsRemaining: hero.attributes.hints,
          startTime: Date.now(),
          correctAnswers: 0,
          wrongAnswers: 0,
          isGameOver: false,
          isLevelComplete: false,
        };

        set({ gameSession: session });
      },

      answerQuestion: (isCorrect) =>
        set((state) => {
          if (!state.gameSession) return state;

          const session = { ...state.gameSession };

          if (isCorrect) {
            session.correctAnswers += 1;
            session.score += Math.max(50, 100 - session.hintsUsed * 10);
          } else {
            session.wrongAnswers += 1;
            session.lives -= 1;

            if (session.lives <= 0) {
              session.isGameOver = true;
            }
          }

          return { gameSession: session };
        }),

      nextQuestion: () =>
        set((state) => {
          if (!state.gameSession) return state;

          const session = state.gameSession;

          // 🚫 HARD GUARDS (THIS FIXES YOUR BUG)
          if (session.isGameOver || session.isLevelComplete) {
            return state;
          }

          return {
            gameSession: {
              ...session,
              currentQuestion: session.currentQuestion + 1,
            },
          };
        }),

      useHint: () =>
        set((state) => {
          if (!state.gameSession || state.gameSession.hintsRemaining <= 0) {
            return state;
          }

          return {
            gameSession: {
              ...state.gameSession,
              hintsUsed: state.gameSession.hintsUsed + 1,
              hintsRemaining: state.gameSession.hintsRemaining - 1,
            },
          };
        }),

      endLevel: (completed) =>
        set((state) => {
          if (!state.gameSession) return state;

          const session = {
            ...state.gameSession,
            isLevelComplete: completed,
          };

          if (!completed) {
            return { gameSession: session };
          }

          const total =
            session.correctAnswers + session.wrongAnswers;

          const accuracy =
            total > 0 ? (session.correctAnswers / total) * 100 : 0;

          const stars = get().calculateStars(accuracy, session.hintsUsed);
          const timeTaken = (Date.now() - session.startTime) / 1000;

          const existing =
            state.playerProgress.levelsProgress[session.levelId];

          const progress: LevelProgress = {
            levelId: session.levelId,
            completed: true,
            stars: Math.max(stars, existing?.stars || 0),
            bestScore: Math.max(session.score, existing?.bestScore || 0),
            bestTime: existing?.bestTime
              ? Math.min(timeTaken, existing.bestTime)
              : timeTaken,
            accuracy: Math.max(accuracy, existing?.accuracy || 0),
          };

          const xp = session.score + stars * 50;

          return {
            gameSession: session,
            playerProgress: {
              ...state.playerProgress,
              totalXP: state.playerProgress.totalXP + xp,
              currentLevel: Math.max(
                state.playerProgress.currentLevel,
                Math.min(session.levelId + 1, getTotalLevels())
              ),
              levelsProgress: {
                ...state.playerProgress.levelsProgress,
                [session.levelId]: progress,
              },
            },
          };
        }),

      resetGameSession: () => set({ gameSession: null }),

      /* ---------- PROGRESSION ---------- */

      updateLevelProgress: (levelId, progress) =>
        set((state) => ({
          playerProgress: {
            ...state.playerProgress,
            levelsProgress: {
              ...state.playerProgress.levelsProgress,
              [levelId]: {
                ...(state.playerProgress.levelsProgress[levelId] || {
                  levelId,
                  completed: false,
                  stars: 0,
                  bestScore: 0,
                  bestTime: 0,
                  accuracy: 0,
                }),
                ...progress,
              },
            },
          },
        })),

      addXP: (amount) =>
        set((state) => ({
          playerProgress: {
            ...state.playerProgress,
            totalXP: state.playerProgress.totalXP + amount,
          },
        })),

      unlockNextLevel: () =>
        set((state) => ({
          playerProgress: {
            ...state.playerProgress,
            currentLevel: Math.min(
              state.playerProgress.currentLevel + 1,
              getTotalLevels()
            ),
          },
        })),

      /* ---------- UTILS ---------- */

      canPlayLevel: (levelId) =>
        levelId <= get().playerProgress.currentLevel,

      getLevelProgress: (levelId) =>
        get().playerProgress.levelsProgress[levelId],

      calculateStars: (accuracy, hintsUsed) => {
        if (accuracy >= 90 && hintsUsed === 0) return 3;
        if (accuracy >= 70) return 2;
        return 1;
      },
    }),
    {
      name: 'ecoquest-game-storage',
      partialize: (state) => ({
        playerProgress: state.playerProgress,
        playerName: state.playerName,
      }),
    }
  )
);
