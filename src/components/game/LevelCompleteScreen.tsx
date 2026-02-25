import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Star, Sparkles, ArrowRight, Home, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';
import Confetti from './Confetti';

interface LevelCompleteScreenProps {
  level: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  hintsUsed: number;
  timeElapsed: number;
  onNextLevel: () => void;
  onExit: () => void;
}

export default function LevelCompleteScreen({
  level,
  score,
  correctAnswers,
  totalQuestions,
  hintsUsed,
  timeElapsed,
  onNextLevel,
  onExit,
}: LevelCompleteScreenProps) {
  const { calculateStars } = useGameStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedXP, setAnimatedXP] = useState(0);

  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const stars = calculateStars(accuracy, hintsUsed);
  const xpEarned = score + stars * 50;

  useEffect(() => {
    setShowConfetti(true);

    // Animate score
    const scoreInterval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= score) {
          clearInterval(scoreInterval);
          return score;
        }
        return prev + Math.ceil(score / 30);
      });
    }, 30);

    // Animate XP with delay
    setTimeout(() => {
      const xpInterval = setInterval(() => {
        setAnimatedXP((prev) => {
          if (prev >= xpEarned) {
            clearInterval(xpInterval);
            return xpEarned;
          }
          return prev + Math.ceil(xpEarned / 30);
        });
      }, 30);
    }, 500);

    return () => {
      clearInterval(scoreInterval);
    };
  }, [score, xpEarned]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-eco flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && stars === 3 && <Confetti />}

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="bg-card rounded-3xl p-8 shadow-xl max-w-md w-full text-center relative z-10"
      >
        {/* Stars */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 mb-4"
        >
          {[1, 2, 3].map((star) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: star <= stars ? 1 : 0.8,
                rotate: 0 
              }}
              transition={{ 
                delay: 0.4 + star * 0.2,
                type: 'spring',
                stiffness: 300
              }}
            >
              <Star
                className={cn(
                  'w-12 h-12',
                  star <= stars
                    ? 'text-accent-foreground fill-accent-foreground drop-shadow-lg'
                    : 'text-muted-foreground/30'
                )}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-display font-bold text-foreground mb-2"
        >
          Level {level} Complete!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-6"
        >
          {stars === 3
            ? '🌟 Perfect! You\'re an environmental genius!'
            : stars === 2
            ? '🌍 Great job protecting the planet!'
            : '🌱 Good start! Keep learning!'}
        </motion.p>

        {/* Score Card */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="bg-gradient-hero rounded-xl p-4 mb-6 text-primary-foreground"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm opacity-80">XP Earned</span>
          </div>
          <motion.p
            className="text-4xl font-display font-bold"
          >
            +{animatedXP}
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-muted rounded-xl p-3">
            <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="font-bold text-foreground">{accuracy.toFixed(0)}%</p>
          </div>
          <div className="bg-muted rounded-xl p-3">
            <Clock className="w-5 h-5 mx-auto mb-1 text-secondary" />
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-bold text-foreground">{formatTime(timeElapsed)}</p>
          </div>
          <div className="bg-muted rounded-xl p-3">
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-accent-foreground" />
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="font-bold text-foreground">{animatedScore}</p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          {level < 20 && (
            <Button
              onClick={onNextLevel}
              size="lg"
              className="w-full h-14 text-lg font-display bg-gradient-hero hover:opacity-90 shadow-glow-primary"
            >
              Next Level
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          <Button
            onClick={onExit}
            variant="outline"
            size="lg"
            className="w-full h-12"
          >
            <Home className="mr-2 w-4 h-4" />
            Back to Levels
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
