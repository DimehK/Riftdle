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
        {/* Header */}
        <header className="text-center mb-8 md:mb-12 px-4">
          <h1 className="text-5xl md:text-8xl font-bold mb-4 text-white"
              style={{
                textShadow: '4px 4px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
                letterSpacing: '0.1em'
              }}>
            RIFTDLE
          </h1>
          <p className="text-base md:text-xl text-white font-semibold"
             style={{
               textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
             }}>
            Guess the champion based on gender, position, species, range, region, and release year
          </p>
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

        {/* Footer */}
        <footer className="text-center mt-16 text-white text-sm">
          <p className="font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Made with love by a LoL fan for LoL fans
          </p>
          <p className="mt-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Data from Riot Games Data Dragon API
          </p>
          <p className="mt-2 text-xs opacity-75" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            This project is not affiliated with Riot Games
          </p>
        </footer>
      </div>
    </main>
  );
}
