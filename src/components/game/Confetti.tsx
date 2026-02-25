import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(145 63% 42%)', // primary green
      'hsl(200 70% 50%)', // secondary blue
      'hsl(45 93% 58%)',  // accent yellow
      'hsl(280 60% 55%)', // purple
      'hsl(340 75% 55%)', // pink
    ];

    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));

    setPieces(newPieces);

    // Clean up after animation
    const timer = setTimeout(() => {
      setPieces([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti absolute w-3 h-3"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}
