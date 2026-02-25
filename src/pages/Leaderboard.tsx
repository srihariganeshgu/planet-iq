import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLeaderboard } from '@/data/leaderboard';
import { getHeroById } from '@/data/heroes';
import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const navigate = useNavigate();
  const { playerProgress, playerName } = useGameStore();
  const leaderboard = getLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-accent-foreground" />;
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3:
        return <Award className="w-6 h-6 text-chart-4" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };
  const playerRank = leaderboard.findIndex(
    (entry) => entry.totalXP <= playerProgress.totalXP
  );
  return (
    <div className="min-h-screen bg-gradient-eco py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center mb-6"
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Leaderboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Top eco-warriors around the world
            </p>
          </div>
        </motion.div>        
        {playerProgress.totalXP > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-hero rounded-2xl p-4 mb-6 text-primary-foreground"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Your Stats</p>
                  <p className="font-display font-bold text-lg">{playerName || 'You'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{playerProgress.totalXP} XP</p>
                <p className="text-sm opacity-80">
                  {playerRank >= 0 ? `Rank #${playerRank + 1}` : 'Keep playing!'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
<motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {leaderboard.map((entry) => {
            const hero = getHeroById(entry.heroId);
            return (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className={cn(
                  'bg-card rounded-xl p-4 shadow-md flex items-center gap-4 border-2',
                  entry.rank === 1 && 'border-accent-foreground bg-accent/30',
                  entry.rank === 2 && 'border-muted-foreground/50',
                  entry.rank === 3 && 'border-chart-4/50',
                  entry.rank > 3 && 'border-transparent'
                )}
              >  
                <div className="w-10 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                  {hero?.emoji || '🌍'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-foreground truncate">
                    {entry.playerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.levelsCompleted} levels • {entry.accuracy.toFixed(1)}% accuracy
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{entry.totalXP.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {leaderboard.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              No entries yet
            </h2>
            <p className="text-muted-foreground mb-4">
              Be the first to make it to the leaderboard!
            </p>
            <Button onClick={() => navigate('/levels')}>Start Playing</Button>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button onClick={() => navigate('/levels')} className="font-display">
            Back to Quest
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
