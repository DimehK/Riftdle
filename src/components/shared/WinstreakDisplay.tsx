'use client';

import { useState } from 'react';
import { useChampionStore } from '@/store/championStore';
import { useProPlayerStore } from '@/store/proPlayerStore';

interface Props {
  winstreak: number;
  bestStreak: number;
  totalGamesPlayed: number;
  totalWins: number;
  mode: 'champions' | 'proplayers';
}

export default function WinstreakDisplay({
  winstreak,
  bestStreak,
  totalGamesPlayed,
  totalWins,
  mode
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const championResetStats = useChampionStore((state) => state.resetAllStats);
  const proPlayerResetStats = useProPlayerStore((state) => state.resetAllStats);

  const handleReset = () => {
    if (mode === 'champions') {
      championResetStats();
    } else {
      proPlayerResetStats();
    }
    setShowConfirm(false);
  };
  const winRate = totalGamesPlayed > 0
    ? Math.round((totalWins / totalGamesPlayed) * 100)
    : 0;

  // Couleurs avec transparence pour voir le background
  const colors = {
    streak: 'bg-black/40 backdrop-blur-md border-2 border-white/20',
    best: 'bg-black/40 backdrop-blur-md border-2 border-white/20',
    games: 'bg-black/40 backdrop-blur-md border-2 border-white/20',
    rate: 'bg-black/40 backdrop-blur-md border-2 border-white/20',
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Winstreak actuelle */}
        <div className={`${colors.streak} rounded-xl p-6 text-white shadow-lg transform transition-transform duration-500 hover:scale-105`}>
          <div className="text-center">
            <div className="text-4xl font-extrabold mb-1">{winstreak}</div>
            <div className="text-sm opacity-90 font-medium">Current Streak</div>
          </div>
        </div>

        {/* Meilleure série */}
        <div className={`${colors.best} rounded-xl p-6 text-white shadow-lg transform transition-transform duration-500 hover:scale-105`}>
          <div className="text-center">
            <div className="text-4xl font-extrabold mb-1">{bestStreak}</div>
            <div className="text-sm opacity-90 font-medium">Best Streak</div>
          </div>
        </div>

        {/* Parties jouées */}
        <div className={`${colors.games} rounded-xl p-6 text-white shadow-lg transform transition-transform duration-500 hover:scale-105`}>
          <div className="text-center">
            <div className="text-4xl font-extrabold mb-1">{totalGamesPlayed}</div>
            <div className="text-sm opacity-90 font-medium">Games Played</div>
          </div>
        </div>

        {/* Taux de victoire */}
        <div className={`${colors.rate} rounded-xl p-6 text-white shadow-lg transform transition-transform duration-500 hover:scale-105`}>
          <div className="text-center">
            <div className="text-4xl font-extrabold mb-1">{winRate}%</div>
            <div className="text-sm opacity-90 font-medium">Win Rate</div>
          </div>
        </div>

        {/* Reset Stats Button */}
        <div className="bg-black/40 backdrop-blur-md border-2 border-white/20 rounded-xl p-6 text-white shadow-lg flex items-center justify-center">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full h-full flex flex-col items-center justify-center gap-2 hover:border-red-400 transition-colors duration-500"
            >
              <div className="text-3xl">🔄</div>
              <div className="text-sm opacity-90 font-medium">Reset Stats</div>
            </button>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <div className="text-xs text-center mb-2">Are you sure?</div>
              <button
                onClick={handleReset}
                className="bg-red-500/80 px-3 py-2 rounded text-xs font-bold hover:bg-red-600"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500/80 px-3 py-2 rounded text-xs font-bold hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
