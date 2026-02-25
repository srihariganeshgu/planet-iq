import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import HomePage from './pages/HomePage';
import HeroSelection from './pages/HeroSelection';
import LevelSelection from './pages/LevelSelection';
import GamePlay from './pages/GamePlay';
import Leaderboard from './pages/Leaderboard';
import Learn from './pages/Learn';
import NotFound from './pages/NotFound';
const queryClient = new QueryClient();
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuthStore();
  if (loading) return null; 
  if (!user) return <Navigate to="/" replace />;
  return children;
}
const App = () => {
  const setUser = useAuthStore((s) => s.setUser);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsub();
  }, [setUser]);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route
              path="/heroes"
              element={
                <ProtectedRoute>
                  <HeroSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/levels"
              element={
                <ProtectedRoute>
                  <LevelSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/play/:levelId"
              element={
                <ProtectedRoute>
                  <GamePlay />
                </ProtectedRoute>
              }
            />          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
