import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Trash2, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HintResult, HintType } from '@/types/game';
import { cn } from '@/lib/utils';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHint: (hintType: HintType) => void;
  currentHint: HintResult | null;
  hintsRemaining: number;
  hintStrength: 'weak' | 'medium' | 'strong';
}

export default function HintModal({
  isOpen,
  onClose,
  onSelectHint,
  currentHint,
  hintsRemaining,
  hintStrength,
}: HintModalProps) {
  const hintOptions = [
    {
      type: 'eliminate' as HintType,
      icon: Trash2,
      title: 'Eliminate Option',
      description: 'Remove one wrong answer',
      color: 'text-destructive',
    },
    {
      type: 'keyword' as HintType,
      icon: Lightbulb,
      title: 'Keyword Clue',
      description: 'Get a helpful keyword',
      color: 'text-accent-foreground',
    },
    {
      type: 'ai-explanation' as HintType,
      icon: Brain,
      title: 'AI Explanation',
      description: 'Get a detailed explanation',
      color: 'text-primary',
    },
  ];

  const getStrengthLabel = () => {
    switch (hintStrength) {
      case 'weak':
        return 'Basic hints available';
      case 'medium':
        return 'Helpful hints available';
      case 'strong':
        return 'Powerful hints available';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-card rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
                <h2 className="text-lg font-display font-bold text-foreground">
                  Use a Hint
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              {currentHint ? (
                // Show hint result
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    {currentHint.type === 'eliminate' && 'Option Eliminated!'}
                    {currentHint.type === 'keyword' && 'Here\'s a Clue!'}
                    {currentHint.type === 'ai-explanation' && 'AI Explanation'}
                  </p>
                  <p className="text-muted-foreground bg-muted rounded-lg p-4">
                    {currentHint.content}
                  </p>
                  <Button onClick={onClose} className="mt-4">
                    Got it!
                  </Button>
                </motion.div>
              ) : (
                // Show hint options
                <>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {getStrengthLabel()} • {hintsRemaining} remaining
                  </p>

                  <div className="space-y-3">
                    {hintOptions.map((option) => (
                      <motion.button
                        key={option.type}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectHint(option.type)}
                        className="w-full p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:border-primary transition-all flex items-center gap-4 text-left"
                      >
                        <div className={cn('w-12 h-12 rounded-xl bg-card flex items-center justify-center', option.color)}>
                          <option.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-foreground">
                            {option.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    ⚠️ Using hints reduces your final score
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
