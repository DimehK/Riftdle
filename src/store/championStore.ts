import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Champion, ChampionGuess } from '@/types/champion';

interface ChampionStore {
  // État du jeu
  currentChampion: Champion | null;
  guesses: ChampionGuess[];
  isGameWon: boolean;
  gaveUp: boolean;

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

export const useChampionStore = create<ChampionStore>()(
  persist(
    (set, get) => ({
      // Valeurs initiales
      currentChampion: null,
      guesses: [],
      isGameWon: false,
      gaveUp: false,
      winstreak: 0,
      bestStreak: 0,
      totalGamesPlayed: 0,
      totalWins: 0,

      // Définir le champion à deviner
      setCurrentChampion: (champion) => {
        set({
          currentChampion: champion,
          guesses: [],
          isGameWon: false,
          gaveUp: false
        });
      },

      // Ajouter une tentative
      addGuess: (champion) => {
        const { currentChampion, guesses } = get();

        // Vérifications
        if (!currentChampion || get().isGameWon) return;

        // Empêcher les doublons
        const alreadyGuessed = guesses.some(
          g => g.champion.id === champion.id
        );
        if (alreadyGuessed) return;

        // Vérifier si c'est correct
        const isCorrect = champion.id === currentChampion.id;

        // Mettre à jour l'état
        set((state) => ({
          guesses: [...state.guesses, { champion, isCorrect }],
          isGameWon: isCorrect,
        }));

        // Si victoire, incrémenter winstreak et stats
        if (isCorrect) {
          get().incrementWinstreak();
          set((state) => ({
            totalWins: state.totalWins + 1,
            totalGamesPlayed: state.totalGamesPlayed + 1,
          }));
        }
      },

      // Nouvelle partie
      resetGame: () => {
        const { isGameWon, gaveUp, guesses } = get();

        // Si abandon ou perte (et qu'il y a eu des tentatives), reset winstreak et incrémenter games played
        if (!isGameWon || gaveUp) {
          get().resetWinstreak();
          // Incrémenter totalGamesPlayed seulement si le jeu était actif (au moins 1 essai) et qu'on a perdu
          if (guesses.length > 0) {
            set((state) => ({
              totalGamesPlayed: state.totalGamesPlayed + 1,
            }));
          }
        }

        set({
          currentChampion: null,
          guesses: [],
          isGameWon: false,
          gaveUp: false,
        });
      },

      // Gérer la winstreak
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

      // Révéler la réponse (abandon)
      revealAnswer: () => {
        const { currentChampion } = get();
        if (!currentChampion) return;

        // Reset winstreak car c'est un abandon
        get().resetWinstreak();

        // Ajouter la bonne réponse comme dernière tentative
        set((state) => ({
          guesses: [...state.guesses, { champion: currentChampion, isCorrect: true }],
          isGameWon: true,
          gaveUp: true,
        }));
      },

      // Réinitialiser toutes les statistiques
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
      name: 'loldle-champion-storage',
      // Ne sauvegarder que les stats
      partialize: (state) => ({
        winstreak: state.winstreak,
        bestStreak: state.bestStreak,
        totalGamesPlayed: state.totalGamesPlayed,
        totalWins: state.totalWins,
      }),
    }
  )
);