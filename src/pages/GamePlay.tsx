import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, Lightbulb, X, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGameStore } from '@/store/gameStore';
import { generateQuestionsForLevel } from '@/data/questions';
import { generateHint, generateEncouragement } from '@/services/geminiService';
import { Question, HintResult, HintType } from '@/types/game';
import { cn } from '@/lib/utils';
import GameOverScreen from '@/components/game/GameOverScreen';
import LevelCompleteScreen from '@/components/game/LevelCompleteScreen';
import HintModal from '@/components/game/HintModal';
import AnswerFeedback from '@/components/game/AnswerFeedback';

export default function GamePlay() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const level = parseInt(levelId || '1', 10);

  const {
    gameSession,
    startLevel,
    answerQuestion,
    nextQuestion, // ✅ REQUIRED
    useHint,
    endLevel,
    resetGameSession,
    getSelectedHero,
  } = useGameStore();

  const hero = getSelectedHero();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [encouragement, setEncouragement] = useState('');
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHint, setCurrentHint] = useState<HintResult | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    if (!hero) {
      navigate('/heroes');
      return;
    }

    setQuestions(generateQuestionsForLevel(level));
    startLevel(level);

    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHintModal(false);
    setEliminatedOptions([]);
    setStreak(0);
    setTimeElapsed(0);

    return () => resetGameSession();
  }, [level, hero, navigate, startLevel, resetGameSession]);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (!gameSession || gameSession.isGameOver || gameSession.isLevelComplete)
      return;

    const timer = setInterval(() => {
      setTimeElapsed((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameSession]);

  const currentQuestion = questions[gameSession?.currentQuestion ?? 0];

  /* ---------------- ANSWER ---------------- */

  const handleAnswer = async (answerIndex: number) => {
    if (selectedAnswer !== null || !gameSession || !currentQuestion) return;

    setSelectedAnswer(answerIndex);

    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);

    const remainingLives = correct
      ? gameSession.lives
      : gameSession.lives - 1;

    const message = await generateEncouragement(
      correct,
      nextStreak,
      remainingLives
    );

    setEncouragement(message);
    setShowFeedback(true);

    answerQuestion(correct);
  };

  /* ---------------- CONTINUE ---------------- */

  const handleNextQuestion = useCallback(() => {
    if (!gameSession) return;

    setSelectedAnswer(null);
    setShowFeedback(false);
    setEncouragement('');
    setCurrentHint(null);
    setEliminatedOptions([]);
    setShowHintModal(false);

    if (gameSession.currentQuestion + 1 >= questions.length) {
      endLevel(true);
    } else {
      nextQuestion();
    }
  }, [gameSession, questions.length, endLevel, nextQuestion]);



  const handleUseHint = async (hintType: HintType) => {
    if (!currentQuestion || !hero || !gameSession) return;
    if (gameSession.hintsRemaining <= 0) return;

    useHint();

    const hint = await generateHint(
      currentQuestion,
      hintType,
      hero.attributes.hintStrength
    );

    setCurrentHint(hint);

    if (hint.type === 'eliminate' && hint.eliminatedOption !== undefined) {
      setEliminatedOptions((prev) => [...prev, hint.eliminatedOption!]);
    }

    setShowHintModal(true);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;



  if (!gameSession || !hero) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (gameSession.isGameOver) {
    return (
      <GameOverScreen
        level={level}
        score={gameSession.score}
        onRetry={() => {
          resetGameSession();
          startLevel(level);
          setQuestions(generateQuestionsForLevel(level));
          setTimeElapsed(0);
          setStreak(0);
        }}
        onExit={() => navigate('/levels')}
      />
    );
  }

  if (gameSession.isLevelComplete) {
    return (
      <LevelCompleteScreen
        level={level}
        score={gameSession.score}
        correctAnswers={gameSession.correctAnswers}
        totalQuestions={questions.length}
        hintsUsed={gameSession.hintsUsed}
        timeElapsed={timeElapsed}
        onNextLevel={() =>
          navigate(level < 20 ? `/play/${level + 1}` : '/levels')
        }
        onExit={() => navigate('/levels')}
      />
    );
  }

  if (!currentQuestion) return null;



  return (
    <div className="min-h-screen bg-gradient-eco px-4 py-4">
      <div className="mx-auto max-w-2xl">

        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/levels')}>
            <X className="w-5 h-5" />
          </Button>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timeElapsed)}</span>
            </div>

            <div className="px-3 py-1 bg-card rounded-lg font-bold">
              Level {level}
            </div>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: hero.attributes.maxLives }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  'w-6 h-6',
                  i < gameSession.lives
                    ? 'text-destructive fill-destructive'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
        </div>


        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {gameSession.currentQuestion + 1}</span>
            <span>{questions.length}</span>
          </div>
          <Progress
            value={
              ((gameSession.currentQuestion + 1) / questions.length) * 100
            }
          />
        </div>


        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="bg-card p-6 rounded-2xl shadow"
          >
            <h2 className="text-xl font-bold mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const disabled =
                  selectedAnswer !== null ||
                  eliminatedOptions.includes(idx);

                return (
                  <button
                    key={idx}
                    disabled={disabled}
                    onClick={() => handleAnswer(idx)}
                    className={cn(
                      'w-full p-4 rounded-xl border text-left',
                      disabled && 'opacity-50'
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>


        {!showFeedback && gameSession.hintsRemaining > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowHintModal(true)} variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              Use Hint ({gameSession.hintsRemaining})
            </Button>
          </div>
        )}

        <AnimatePresence>
          {showFeedback && (
            <AnswerFeedback
              isCorrect={isCorrect}
              encouragement={encouragement}
              explanation={currentQuestion.explanation}
              onContinue={handleNextQuestion}
            />
          )}
        </AnimatePresence>

        <HintModal
          isOpen={showHintModal && !showFeedback}
          onClose={() => setShowHintModal(false)}
          onSelectHint={handleUseHint}
          currentHint={currentHint}
          hintsRemaining={gameSession.hintsRemaining}
          hintStrength={hero.attributes.hintStrength}
        />
      </div>
    </div>
  );
}
