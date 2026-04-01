import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Champion } from '@/types/champion';

interface SplashArtStore {
  // État du jeu
  currentChampion: Champion | null;
  guessedChampionIds: string[];
  isGameWon: boolean;
  gaveUp: boolean;
  zoomLevel: number;

  // Statistiques
  winstreak: number;
  bestStreak: number;
  totalGamesPlayed: number;
  totalWins: number;

  // Actions
  setCurrentChampion: (champion: Champion) => void;
  addGuess: (champion: Champion) => void;
  resetGame: () => void;
  incrementWinstreak: () => void;
  resetWinstreak: () => void;
  revealAnswer: () => void;
  resetAllStats: () => void;
}

// Zoom levels: starts very zoomed in, progressively zooms out
const ZOOM_LEVELS = [6, 4.5, 3.5, 2.8, 2.2, 1.8, 1.4, 1.1, 1];

export const useSplashArtStore = create<SplashArtStore>()(
  persist(
    (set, get) => ({
      currentChampion: null,
      guessedChampionIds: [],
      isGameWon: false,
      gaveUp: false,
      zoomLevel: 0,
      winstreak: 0,
      bestStreak: 0,
      totalGamesPlayed: 0,
      totalWins: 0,

      setCurrentChampion: (champion) => {
        set({
          currentChampion: champion,
          guessedChampionIds: [],
          isGameWon: false,
          gaveUp: false,
          zoomLevel: 0,
        });
      },

      addGuess: (champion) => {
        const { currentChampion, guessedChampionIds, isGameWon, zoomLevel } = get();
        if (!currentChampion || isGameWon) return;
        if (guessedChampionIds.includes(champion.id)) return;

        const isCorrect = champion.id === currentChampion.id;
        const newZoom = Math.min(zoomLevel + 1, ZOOM_LEVELS.length - 1);

        set({
          guessedChampionIds: [...guessedChampionIds, champion.id],
          isGameWon: isCorrect,
          zoomLevel: isCorrect ? zoomLevel : newZoom,
        });

        if (isCorrect) {
          get().incrementWinstreak();
          set((state) => ({
            totalWins: state.totalWins + 1,
            totalGamesPlayed: state.totalGamesPlayed + 1,
          }));
        }
      },

      resetGame: () => {
        const { isGameWon, gaveUp, guessedChampionIds } = get();
        if (!isGameWon || gaveUp) {
          get().resetWinstreak();
          if (guessedChampionIds.length > 0) {
            set((state) => ({
              totalGamesPlayed: state.totalGamesPlayed + 1,
            }));
          }
        }
        set({
          currentChampion: null,
          guessedChampionIds: [],
          isGameWon: false,
          gaveUp: false,
          zoomLevel: 0,
        });
      },

      incrementWinstreak: () => {
        set((state) => {
          const newStreak = state.winstreak + 1;
          return {
            winstreak: newStreak,
            bestStreak: Math.max(newStreak, state.bestStreak),
          };
        });
      },

      resetWinstreak: () => {
        set({ winstreak: 0 });
      },

      revealAnswer: () => {
        const { currentChampion } = get();
        if (!currentChampion) return;
        get().resetWinstreak();
        set((state) => ({
          guessedChampionIds: [...state.guessedChampionIds, currentChampion.id],
          isGameWon: true,
          gaveUp: true,
        }));
      },

      resetAllStats: () => {
        set({
          winstreak: 0,
          bestStreak: 0,
          totalGamesPlayed: 0,
          totalWins: 0,
        });
      },
    }),
    {
      name: 'loldle-splashart-storage',
      partialize: (state) => ({
        winstreak: state.winstreak,
        bestStreak: state.bestStreak,
        totalGamesPlayed: state.totalGamesPlayed,
        totalWins: state.totalWins,
      }),
    }
  )
);

export { ZOOM_LEVELS };
