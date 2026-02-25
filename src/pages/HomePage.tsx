import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Play, ArrowRight, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  logout,
} from '@/services/authService';
import { savePlayerName } from '@/services/userService';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { playerName, setPlayerName, playerProgress } = useGameStore();

  const [name, setName] = useState(playerName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const needsName = user && !playerName;

  const handleSaveName = async () => {
    if (!name.trim()) return;
    setPlayerName(name.trim());
    await savePlayerName(name.trim());
    navigate(playerProgress.selectedHeroId ? '/levels' : '/heroes');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* VIDEO BG */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          PlanetIQ
        </h1>
      </div>

      {/* CENTER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* LOGIN */}
          {!user && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className=" backdrop-blur rounded-2xl p-6 w-full max-w-md"
            >
              <Button onClick={signInWithGoogle} className="w-full h-12 mb-4">
                <LogIn className="mr-2" /> Continue with Google
              </Button>

              <Input
                placeholder="Email"
                className="mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                className="mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex gap-2">
                <Button
                  className="w-full"
                  onClick={() => signInWithEmail(email, password)}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signUpWithEmail(email, password)}
                >
                  Sign Up
                </Button>
              </div>
            </motion.div>
          )}

          {/* NAME SETUP */}
          {needsName && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/90 backdrop-blur rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-lg font-semibold mb-3 text-center">
                Choose your player name
              </h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mb-4"
              />
              <Button className="w-full h-12" onClick={handleSaveName}>
                Start Journey
                <Play className="ml-2" />
              </Button>
            </motion.div>
          )}

          {/* CONTINUE + NAME + LOGOUT */}
          {user && playerName && (
            <motion.div
              key="continue"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Name */}
              <p className="text-lg font-semibold text-white/90">
                Welcome,&nbsp;
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {playerName}
                </span>{' '}
                👋
              </p>

              {/* Continue */}
              <Button
                size="lg"
                onClick={() => navigate('/levels')}
                className="h-16 px-10 text-xl bg-transparent shadow-glow-primary"
              >
                Continue Quest
                <ArrowRight className="ml-3" />
              </Button>

              {/* Logout */}
              <Button
                variant="ghost"
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LEADERBOARD */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button variant="ghost" onClick={() => navigate('/leaderboard')}>
          <Trophy className="mr-2" /> Leaderboard
        </Button>
      </div>
    </div>
  );
}
