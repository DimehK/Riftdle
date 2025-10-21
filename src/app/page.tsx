'use client';

// Riftdle - League of Legends guessing game
import { useState, useEffect } from 'react';
import { getAllChampions } from '@/utils/riotApi';
import { Champion } from '@/types/champion';
import { useChampionStore } from '@/store/championStore';
import { useProPlayerStore } from '@/store/proPlayerStore';
import ChampionGameBoard from '@/components/champions/ChampionGameBoard';
import ProPlayerGameBoard from '@/components/proplayers/ProPlayerGameBoard';
import WinstreakDisplay from '@/components/shared/WinstreakDisplay';
import ModeSelector from '@/components/shared/ModeSelector';

export default function Home() {
  const [mode, setMode] = useState<'champions' | 'proplayers'>('champions');
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les stats des 2 modes
  const championWinstreak = useChampionStore((state) => state.winstreak);
  const championBestStreak = useChampionStore((state) => state.bestStreak);
  const championTotalGamesPlayed = useChampionStore((state) => state.totalGamesPlayed);
  const championTotalWins = useChampionStore((state) => state.totalWins);

  const proPlayerWinstreak = useProPlayerStore((state) => state.winstreak);
  const proPlayerBestStreak = useProPlayerStore((state) => state.bestStreak);
  const proPlayerTotalGamesPlayed = useProPlayerStore((state) => state.totalGamesPlayed);
  const proPlayerTotalWins = useProPlayerStore((state) => state.totalWins);

  const championStats = {
    winstreak: championWinstreak,
    bestStreak: championBestStreak,
    totalGamesPlayed: championTotalGamesPlayed,
    totalWins: championTotalWins,
  };

  const proPlayerStats = {
    winstreak: proPlayerWinstreak,
    bestStreak: proPlayerBestStreak,
    totalGamesPlayed: proPlayerTotalGamesPlayed,
    totalWins: proPlayerTotalWins,
  };

  // Charger les champions au démarrage
  useEffect(() => {
    async function loadChampions() {
      setLoading(true);
      const data = await getAllChampions();
      setChampions(data);
      setLoading(false);
    }
    loadChampions();
  }, []);

  // Changer de mode
  const handleModeChange = (newMode: 'champions' | 'proplayers') => {
    setMode(newMode);
  };

  // Déterminer les stats à afficher selon le mode
  const currentStats = mode === 'champions' ? championStats : proPlayerStats;

  return (
    <main className="min-h-screen relative py-12">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://www.gratismmorpg.de/wp-content/uploads/2014/08/League-of-Legends-wallpaper-6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - LoL Gold Glow */}
        <header className="text-center mb-4 px-4">
          <div className="flex justify-center">
            <img
              src="/riftdle-logo.png"
              alt="Riftdle"
              className="h-80 md:h-[500px] w-auto transition-all duration-500 hover:scale-110 cursor-pointer"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(200, 155, 60, 0.8)) drop-shadow(0 0 40px rgba(10, 200, 185, 0.4))'
              }}
            />
          </div>
        </header>

        {/* Sélecteur de mode */}
        <ModeSelector currentMode={mode} onModeChange={handleModeChange} />

        {/* Display des stats */}
        <div className="mb-8">
          <WinstreakDisplay
            winstreak={currentStats.winstreak}
            bestStreak={currentStats.bestStreak}
            totalGamesPlayed={currentStats.totalGamesPlayed}
            totalWins={currentStats.totalWins}
            mode={mode}
          />
        </div>

        {/* Game Board selon le mode */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-2xl text-white">Loading game...</div>
          </div>
        ) : mode === 'champions' ? (
          <ChampionGameBoard champions={champions} />
        ) : (
          <ProPlayerGameBoard />
        )}

        {/* Footer - LoL Gold Theme */}
        <footer className="text-center mt-16 text-sm">
          <div className="inline-block px-8 py-4 rounded-xl border-2 border-[#C89B3C]/30 bg-[#1E2328]/80 backdrop-blur-sm">
            <p className="font-bold text-[#C89B3C] text-lg" style={{ textShadow: '0 0 10px rgba(200, 155, 60, 0.5)' }}>
              Made with love by a LoL fan for LoL fans
            </p>
            <p className="mt-2 text-[#0AC8B9]" style={{ textShadow: '0 0 8px rgba(10, 200, 185, 0.4)' }}>
              Data from Riot Games Data Dragon API
            </p>
            <p className="mt-2 text-xs text-[#F0E6D2]/60">
              This project is not affiliated with Riot Games
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
