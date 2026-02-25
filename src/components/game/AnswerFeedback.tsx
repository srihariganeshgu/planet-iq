import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  encouragement: string;
  explanation: string;
  onContinue: () => void;
}

export default function AnswerFeedback({
  isCorrect,
  encouragement,
  explanation,
  onContinue,
}: AnswerFeedbackProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed inset-x-4 bottom-4 max-w-2xl mx-auto"
    >
      <div
        className={`rounded-2xl p-5 shadow-xl border-2 ${
          isCorrect
            ? 'bg-primary/10 border-primary'
            : 'bg-destructive/10 border-destructive'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
          >
            {isCorrect ? (
              <CheckCircle className="w-8 h-8 text-primary" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
          </motion.div>
          <div>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={`font-display font-bold text-lg ${
                isCorrect ? 'text-primary' : 'text-destructive'
              }`}
            >
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </motion.p>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              {encouragement}
            </motion.p>
          </div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-card/80 rounded-xl p-4 mb-4"
        >
          <p className="text-sm text-muted-foreground mb-1">Learn more:</p>
          <p className="text-foreground">{explanation}</p>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full font-display"
            variant={isCorrect ? 'default' : 'outline'}
          >
            Continue
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
