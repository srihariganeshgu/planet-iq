import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroes } from '@/data/heroes';
import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function HeroSelection() {
  const navigate = useNavigate();
  const { selectHero, playerProgress } = useGameStore();

  const handleSelectHero = (heroId: string) => {
    selectHero(heroId);
    navigate('/levels');
  };

  const getHintStrengthLabel = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak':
        return 'Basic';
      case 'medium':
        return 'Helpful';
      case 'strong':
        return 'Powerful';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
        className="absolute inset-0 w-full h-full object-cover blur scale-105"
      >
        <source src="/levelbg.mp4" type="video/mp4" />
      </video>

      

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center mb-8"
          >
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                Choose Your Hero
              </h1>
              <p className="text-white/70">
                Each hero has unique abilities to help you on your quest!
              </p>
            </div>
          </motion.div>

          {/* Hero Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {heroes.map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                selected={playerProgress.selectedHeroId === hero.id}
                onSelect={() => handleSelectHero(hero.id)}
                getHintStrengthLabel={getHintStrengthLabel}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------
   Hero Card
---------------------------------------- */

function HeroCard({
  hero,
  selected,
  onSelect,
  getHintStrengthLabel,
}: any) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    if (!hero.animation) return;

    fetch(hero.animation)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [hero.animation]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'bg-card/90 backdrop-blur rounded-2xl p-6 shadow-lg cursor-pointer border-2 transition-all',
        selected
          ? 'border-primary ring-2 ring-primary/30'
          : 'border-transparent hover:border-primary/50'
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        {/* Hero Animation */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center justify-center"
        >
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              className="w-20 h-20"
            />
          ) : (
            <span className="text-4xl">{hero.emoji ?? '❓'}</span>
          )}
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-display font-bold mb-1 text-foreground">
            {hero.name}
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            {hero.description}
          </p>

          <div className="grid grid-cols-3 gap-3">
            <Stat icon={<Heart className="w-4 h-4 text-destructive" />} label="Lives">
              {hero.attributes.maxLives}
            </Stat>
            <Stat icon={<Lightbulb className="w-4 h-4 text-accent-foreground" />} label="Hints">
              {hero.attributes.hints}
            </Stat>
            <Stat icon={<Zap className="w-4 h-4 text-primary" />} label="Power">
              {getHintStrengthLabel(hero.attributes.hintStrength)}
            </Stat>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Button
          className={cn(
            'w-full font-display',
            selected ? 'bg-gradient-hero shadow-glow-primary' : ''
          )}
          variant={selected ? 'default' : 'outline'}
        >
          {selected ? (
            <>
              Selected <ArrowRight className="ml-2 w-4 h-4" />
            </>
          ) : (
            'Choose Hero'
          )}
        </Button>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------
   Stat Box
---------------------------------------- */

function Stat({ icon, label, children }: any) {
  return (
    <div className="bg-muted rounded-lg p-2 text-center">
      <div className="mx-auto mb-1 flex justify-center">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold text-foreground text-sm">{children}</p>
    </div>
  );
}
