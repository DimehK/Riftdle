'use client';

import { ProPlayer } from '@/types/proPlayer';

interface Props {
  guess: ProPlayer;
  answer: ProPlayer;
}

export default function ProPlayerResultRow({ guess, answer }: Props) {
  const isCorrect = guess.id === answer.id;

  // Comparer une valeur simple
  const compareValue = (guessVal: string | number | boolean, answerVal: string | number | boolean) => {
    if (guessVal === answerVal) return 'bg-green-500 text-white';
    return 'bg-red-500 text-white';
  };

  // Comparer l'année avec flèche
  const compareYear = (guessYear: number, answerYear: number) => {
    if (guessYear === answerYear) {
      return { bg: 'bg-green-500 text-white', arrow: '=' };
    }
    if (guessYear < answerYear) {
      return { bg: 'bg-red-500 text-white', arrow: '↑' };
    }
    return { bg: 'bg-red-500 text-white', arrow: '↓' };
  };

  // Comparer birth year avec tolérance de +/- 2 ans
  const compareBirthYear = (guessYear: number, answerYear: number) => {
    const diff = Math.abs(guessYear - answerYear);
    if (diff === 0) {
      return { bg: 'bg-green-500 text-white', arrow: '=' };
    }
    if (diff <= 2) {
      return { bg: 'bg-yellow-500 text-white', arrow: guessYear < answerYear ? '↑' : '↓' };
    }
    return { bg: 'bg-red-500 text-white', arrow: guessYear < answerYear ? '↑' : '↓' };
  };

  const startYearComp = compareYear(guess.startYear, answer.startYear);
  const birthYearComp = compareBirthYear(guess.birthYear, answer.birthYear);

  // Affichage normal - 8 colonnes (aussi pour les bonnes réponses)
  return (
    <div className="grid grid-cols-8 gap-2 p-2">
      {/* 1. Player */}
      <div className="bg-gray-700 text-white p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-1">
        <div className="text-sm font-bold text-center">{guess.ign}</div>
        <div className="text-xs opacity-75 text-center">{guess.realName}</div>
      </div>

      {/* 2. Role */}
      <div className={`${compareValue(guess.role, answer.role)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-2`}>
        <div className="text-xs opacity-75 mb-1">Role</div>
        <div className="text-sm font-bold">{guess.role}</div>
      </div>

      {/* 3. Region */}
      <div className={`${compareValue(guess.region, answer.region)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-3`}>
        <div className="text-xs opacity-75 mb-1">Region</div>
        <div className="text-sm font-bold">{guess.region}</div>
      </div>

      {/* 4. League */}
      <div className={`${compareValue(guess.league, answer.league)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-4`}>
        <div className="text-xs opacity-75 mb-1">League</div>
        <div className="text-sm font-bold">{guess.league}</div>
      </div>

      {/* 5. Start Year */}
      <div className={`${startYearComp.bg} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-5`}>
        <div className="text-xs opacity-75 mb-1">Start</div>
        <div className="text-lg font-bold">{guess.startYear}</div>
        <div className="text-lg">{startYearComp.arrow}</div>
      </div>

      {/* 6. Birth Year */}
      <div className={`${birthYearComp.bg} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-6`}>
        <div className="text-xs opacity-75 mb-1">Birth</div>
        <div className="text-lg font-bold">{guess.birthYear}</div>
        <div className="text-lg">{birthYearComp.arrow}</div>
      </div>

      {/* 7. Worlds Winner */}
      <div className={`${compareValue(guess.hasWonWorlds, answer.hasWonWorlds)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-7`}>
        <div className="text-xs opacity-75 mb-1">Has Won Worlds</div>
        <div className="text-2xl">{guess.hasWonWorlds ? '🏆' : '❌'}</div>
      </div>

      {/* 8. Favorite Champion */}
      <div className={`${compareValue(guess.favoriteChampion, answer.favoriteChampion)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-8`}>
        <div className="text-xs opacity-75 mb-1">Favorite Champ</div>
        <div className="text-xs font-bold text-center">{guess.favoriteChampion}</div>
      </div>
    </div>
  );
}
