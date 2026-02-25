import { motion } from 'framer-motion';
import { XCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameOverScreenProps {
  level: number;
  score: number;
  onRetry: () => void;
  onExit: () => void;
}

export default function GameOverScreen({
  level,
  score,
  onRetry,
  onExit,
}: GameOverScreenProps) {
  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center p-4">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Card */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10 bg-card/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            className="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center"
          >
            <XCircle className="w-12 h-12 text-red-500" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-display font-bold text-white mb-2"
        >
          Game Over
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 mb-6"
        >
          Every mistake is a step toward saving the planet 🌍
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="bg-muted/80 rounded-xl p-4 mb-6 backdrop-blur"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="text-2xl font-bold text-foreground">{level}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold text-foreground">{score}</p>
            </div>
          </div>
        </motion.div>

        {/* Eco Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg mb-6 text-white/90"
        >
          🌱 Tip:{' '}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-semibold">
            Think sustainability, not speed
          </span>
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={onRetry}
            size="lg"
            className="w-full h-14 text-lg font-display bg-gradient-hero hover:opacity-90 shadow-glow-primary"
          >
            <RotateCcw className="mr-2 w-5 h-5" />
            Try Again
          </Button>

          <Button
            onClick={onExit}
            variant="outline"
            size="lg"
            className="w-full h-12 text-white border-white/30 hover:bg-white/10"
          >
            <Home className="mr-2 w-4 h-4" />
            Back to Levels
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
