import { Hero } from '@/types/game';

export const heroes: Hero[] = [
  {
    id: 'gaia',
    name: 'Gaia',
    description:
      'The spirit of Earth itself. A balanced hero with steady lives and helpful hints. Perfect for beginners.',
    animation: '/Heroes/Gaia.json',
    color: 'primary',
    attributes: {
      maxLives: 4,
      hints: 2,
      hintStrength: 'medium',
    },
  },
  {
    id: 'aether',
    name: 'Aether',
    description:
      'Master of air and wisdom. Fewer lives, but powerful hints guide every decision.',
    animation: '/Heroes/Aether.json',
    color: 'secondary',
    attributes: {
      maxLives: 3,
      hints: 4,
      hintStrength: 'strong',
    },
  },
  {
    id: 'solara',
    name: 'Solara',
    description:
      'Fueled by solar energy. High endurance with fewer hints, ideal for steady progress.',
    animation: '/Heroes/Solara.json',
    color: 'accent',
    attributes: {
      maxLives: 5,
      hints: 1,
      hintStrength: 'weak',
    },
  },
  {
    id: 'terros',
    name: 'Terros',
    description:
      'Forged from stone and soil. Extremely durable, but relies on instinct over hints.',
    animation: '/Heroes/Terros.json',
    color: 'destructive',
    attributes: {
      maxLives: 6,
      hints: 0,
      hintStrength: 'weak',
    },
  },
];

export const getHeroById = (id: string): Hero | undefined =>
  heroes.find((hero) => hero.id === id);
