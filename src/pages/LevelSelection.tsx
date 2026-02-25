import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Star, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { getTotalLevels } from '@/data/questions';
import { cn } from '@/lib/utils';

export default function LevelSelection() {
  const navigate = useNavigate();
  const {
    canPlayLevel,
    getLevelProgress,
    getSelectedHero,
    playerProgress,
  } = useGameStore();

  const hero = getSelectedHero();
  const totalLevels = getTotalLevels();

  const handleSelectLevel = (level: number) => {
    if (canPlayLevel(level)) {
      navigate(`/play/${level}`);
    }
  };

  const getLevelTheme = (level: number) => {
    if (level <= 4) return { bg: 'from-primary/30 to-primary/10' };
    if (level <= 8) return { bg: 'from-secondary/30 to-secondary/10' };
    if (level <= 12) return { bg: 'from-accent/30 to-accent/10' };
    if (level <= 16) return { bg: 'from-chart-4/30 to-chart-4/10' };
    return { bg: 'from-chart-5/30 to-chart-5/10' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-md scale-105"
      >
        <source src="/levelbg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center">
              <Button
                variant="secondary"
                onClick={() => navigate('/heroes')}
                className="mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                  Select Level
                </h1>
                <p className="text-white/70 text-sm">
                  Complete levels to unlock more challenges!
                </p>
              </div>
            </div>

            {hero && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-3"
              >
                <div className="bg-card/90 backdrop-blur rounded-xl p-3 shadow-md flex items-center gap-2">
                  <span className="text-2xl">{hero.emoji ?? '🧙'}</span>
                  <div className="hidden sm:block">
                    <p className="text-xs text-muted-foreground">Playing as</p>
                    <p className="font-semibold text-sm">{hero.name}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/learn')}
                  className="flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" />
                  Learn
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* XP Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/90 backdrop-blur rounded-xl p-4 shadow-md mb-6 flex items-center gap-4"
          >
            <Sparkles className="w-6 h-6 text-accent-foreground" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Total XP</span>
                <span className="font-bold">
                  {playerProgress.totalXP}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      (playerProgress.totalXP / 20000) * 100,
                      100
                    )}%`,
                  }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/leaderboard')}
            >
              <Trophy className="w-4 h-4 mr-1" />
              Rank
            </Button>
          </motion.div>

          {/* Level Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-4 sm:grid-cols-5 gap-3"
          >
            {Array.from({ length: totalLevels }, (_, i) => i + 1).map(
              (level) => {
                const isUnlocked = canPlayLevel(level);
                const progress = getLevelProgress(level);
                const theme = getLevelTheme(level);

                return (
                  <motion.button
                    key={level}
                    variants={itemVariants}
                    whileHover={isUnlocked ? { scale: 1.1, y: -5 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                    onClick={() => handleSelectLevel(level)}
                    disabled={!isUnlocked}
                    className={cn(
                      'aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all',
                      isUnlocked
                        ? `bg-gradient-to-br ${theme.bg} border-2 border-primary/40 shadow-lg`
                        : 'bg-muted/50 border border-border cursor-not-allowed'
                    )}
                  >
                    <span className="text-2xl font-display font-bold">
                      {level}
                    </span>

                    {!isUnlocked && (
                      <Lock className="w-4 h-4 absolute bottom-2 text-muted-foreground" />
                    )}

                    {progress?.completed && (
                      <div className="absolute bottom-1 flex gap-0.5">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              'w-3 h-3',
                              star <= progress.stars
                                ? 'text-accent-foreground fill-accent-foreground'
                                : 'text-muted-foreground/30'
                            )}
                          />
                        ))}
                      </div>
                    )}

                    {level === playerProgress.currentLevel &&
                      isUnlocked &&
                      !progress?.completed && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full"
                        />
                      )}
                  </motion.button>
                );
              }
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
